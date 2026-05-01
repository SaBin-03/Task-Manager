import { Router } from "express";
import {
  addTask,
  deleteTask,
  filterTask,
  getTaskWithId,
  Update,
} from "../controllers/taskController.js";
// import { isAuth } from "../middleware/auth.js";
import { auth } from "../middleware/isAuth.js";

const taskRouter = Router();

taskRouter.post("/addtask", auth, addTask);
taskRouter.patch("/update/:id", auth, Update);
taskRouter.get("/getTaskWithId",auth, getTaskWithId);
taskRouter.delete("/deleteTask/:id", deleteTask);
taskRouter.get("/filterTask", filterTask);

export default taskRouter;
