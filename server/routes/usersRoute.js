import { Router } from "express";
import { emailVerification, login, logout, register } from "../controllers/usersController.js";
import { isAuth } from "../middleware/auth.js";

const userRouter = Router();


userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.post("/logout",isAuth,logout);
userRouter.post("/verify",isAuth,emailVerification);
userRouter.get("/me", isAuth, (req, res) => {
  res.status(200).json({ success: true, userId: req.user.id });
});



export default userRouter;
