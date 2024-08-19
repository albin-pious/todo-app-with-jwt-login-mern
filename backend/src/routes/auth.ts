import { Router } from "express";
import { checkUsername, login, refreshToken, register } from "../controllers/authController";

const authRouter = Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/refresh-token', refreshToken);
authRouter.post('/check-username',checkUsername);

export default authRouter;