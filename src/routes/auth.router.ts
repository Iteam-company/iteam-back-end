import express from 'express';
import AuthController from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/signIn', AuthController.signIn);
authRouter.post('/signUp', AuthController.signUp);
authRouter.post('/regenerateTokens', AuthController.regenerateTokens);

export default authRouter;
