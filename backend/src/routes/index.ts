import { Router } from "express";
import todoRouter from "./todos";
import authRouter from "./auth";

const router = Router();

router.use('/todos', todoRouter);
router.use('/auth', authRouter)

export default router;