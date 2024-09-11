import { Router, Response, Request } from "express";
import { addTask } from "../controllers/taskController";

const taskRouter = Router();

taskRouter.post('/create-task',addTask)


export default taskRouter;