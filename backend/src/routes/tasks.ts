import { Router } from "express";
import { addTask } from "../controllers/taskController";
import { authMiddleWare } from "../middleware/auth";

const taskRouter = Router();

taskRouter.post('/create-task',authMiddleWare ,addTask)


export default taskRouter;