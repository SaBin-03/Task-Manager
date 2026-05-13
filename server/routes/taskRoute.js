import { Router } from "express";
import {
  addTask,
  deleteTask,
  filterTask,
  getspecifictask,
  getTaskWithId,
  Update,
} from "../controllers/taskController.js";
// import { isAuth } from "../middleware/auth.js";
import { auth } from "../middleware/isAuth.js";

const taskRouter = Router();

taskRouter.post("/addtask", auth, addTask);
taskRouter.put("/update/:id", auth, Update);
taskRouter.get("/getTaskWithId",auth, getTaskWithId);
taskRouter.delete("/deleteTask/:id", deleteTask);
taskRouter.get("/filterTask", filterTask);
taskRouter.get("/specifictask/:id",auth,getspecifictask);

export default taskRouter;
