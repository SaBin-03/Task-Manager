import { Router } from "express";
import {
  addTask,
  deleteTask,
  filterTask,
  getTaskWithId,
  Update,
} from "../controllers/taskController.js";
import { isAuth } from "../middleware/auth.js";

const taskRouter = Router();

taskRouter.post("/addtask", isAuth, addTask);
taskRouter.patch("/update/:id", isAuth, Update);
taskRouter.get("/getTaskWithId", isAuth, getTaskWithId);
taskRouter.delete("/deleteTask/:id", deleteTask);
taskRouter.get("/filterTask", filterTask);

export default taskRouter;
