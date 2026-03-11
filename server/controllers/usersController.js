import { UserModel } from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../email/email.js";

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

export const emailVerification = async(req,res) => {
    try {
        const id = req.UserId;
        await UserModel.findByIdAndUpdate(id,{isVerified:true,token:null});

        return res.status(200).json({ success:true , message:"Email Verified" })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
  try {
    const idUser = req.UserId;

    res.cookie("Atoken", "", {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 0,
    });

    await UserModel.findByIdAndUpdate(idUser,{isloggedin:false});

    return res.status(200).json({ success:true,message:"Logedout successfully" });
  } catch (error) {
    console.log(error);
  }
};
