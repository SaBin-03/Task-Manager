import jwt from "jsonwebtoken";
import { UserModel } from "../models/usersModel.js";

export const auth = async (req, res, next) => {
  const token = req.cookies.Atoken;
  try {
    if (!token)
      return res
        .status(401)
        .json({
          success: false,
          message: "Token doesnt exist LogIn To Access",
        });

    const decoded = jwt.verify(token, process.env.ATOKEN);

    req.user = await UserModel.findById(decoded.id);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Invalid session" });
  }
};
