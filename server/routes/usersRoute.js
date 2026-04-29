import { Router } from "express";
import {
  emailVerification,
  forgotPassword,
  login,
  logout,
  passChange,
  register,
  verifyOtp,
} from "../controllers/usersController.js";
import { isAuth } from "../middleware/auth.js";
import { auth } from "../middleware/isAuth.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", isAuth, logout);
userRouter.post("/verify", isAuth, emailVerification);
userRouter.post("/forgetpassword", forgotPassword);
userRouter.post("/otpverify/:email", verifyOtp);
userRouter.post("/passchange/:email", passChange);
userRouter.get("/me", auth, (req, res) => {
  res.status(200).json({ success: true, userId: req.user.id });
});

export default userRouter;
