

import { Router } from "express";
import { addTask, deleteTask, getTaskWithId, statusUpdate } from "../controllers/taskController.js";
import { isAuth } from "../middleware/auth.js";

const taskRouter = Router();

taskRouter.post("/addtask",isAuth,addTask);
taskRouter.patch("/updateStatus/:id",isAuth,statusUpdate);
taskRouter.get("/getTaskWithId",isAuth,getTaskWithId);
taskRouter.delete("/deleteTask/:id",deleteTask);


export default taskRouter;
