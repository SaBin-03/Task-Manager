import { Router } from "express";
import userRouter from "./usersRoute.js";
import taskRouter from "./taskRoute.js";

const serverRouter = Router();



serverRouter.use("/api",userRouter);
serverRouter.use("/api",taskRouter);


export default serverRouter;
