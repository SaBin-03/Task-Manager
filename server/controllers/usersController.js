import { UserModel } from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../email/email.js";
import { sendOtp } from "../email/otSendEmail.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All Field Required" });
  }
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User exist with same email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.ATOKEN, {
      expiresIn: "7d",
    });

    verifyEmail(token, email);

    newUser.token = token;

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: true, message: "All Fields Required" });
  }
  try {
    const regsiteredUser = await UserModel.findOne({ email });
    if(regsiteredUser.isVerified != true){
        return res.status(400).json({ success:false,message:"User Not Verified to login" });
    }
    if (!regsiteredUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const isTruePass = await bcrypt.compare(password, regsiteredUser.password);
    if (!isTruePass) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Password" });
    }

    const Atoken = jwt.sign({ id: regsiteredUser.id }, process.env.ATOKEN, {
      expiresIn: "7d",
    });

    res.cookie("Atoken", Atoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const Rtoken = jwt.sign({ id: regsiteredUser.id }, process.env.RTOKEN, {
      expiresIn: "7d",
    });

    regsiteredUser.isloggedin = true;

    await regsiteredUser.save();

    return res
      .status(200)
      .json({ success: true, message: "User Logged In", regsiteredUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const emailVerification = async (req, res) => {
  try {
    const id = req.UserId;
    await UserModel.findByIdAndUpdate(id, { isVerified: true });

    return res.status(200).json({ success: true, message: "Email Verified" });
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      return res
        .status(404)
        .json({ success: false, message: "Email Not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    existUser.otp = otp;
    existUser.otpExpiry = expiry;

    await existUser.save();

    await sendOtp(email, otp);

    return res
      .status(200)
      .json({ success: true, message: "Otp Send Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const { email } = req.params;

  if (!otp)
    return res.status(400).json({
      success: false,
      message: "Otp is requried",
    });
  try {
    const userOtp = await UserModel.findOne({ email });
    if (!userOtp) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    const otpDatabase = userOtp.otp;

    if (!otpDatabase || !userOtp.otpExpiry) {
      return res
        .status(404)
        .json({ success: false, message: "Otp not generated" });
    }

    if (userOtp.otpExpiry < new Date()) {
      return res
        .status(404)
        .json({ success: false, message: "Otp has expired" });
    }

    if (otpDatabase !== otp) {
      return res.status(403).json({ success: false, message: "Invald otp" });
    }

    userOtp.otp = null;
    userOtp.otpExpiry = null;

    await userOtp.save();

    return res.status(200).json({ success: true, message: "Otp verified" });
  } catch (error) {
    console.log(error);
  }
};

export const passChange = async (req, res) => {
  const { pass, confirmpass } = req.body;
  const { email } = req.params;

  if (!pass || !confirmpass) {
    return res.status(400).json({ success: false, message: "Fill the form" });
  }

  if (pass !== confirmpass) {
    return res
      .status(400)
      .json({ success: false, message: "Password Doesnt Match" });
  }
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const hashesdConfirmPass = await bcrypt.hash(confirmpass, 10);

    user.password = hashesdConfirmPass;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password Changed Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.user._id;

    await UserModel.findByIdAndUpdate(userId, {
      isloggedin: false,
    });
    res.clearCookie("Atoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
