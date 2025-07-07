import express from 'express';
import { authenticateToken } from '../Middleware/authMiddleware.ts';
import { getMe } from '../Controllers/userController.ts';

const userRouter = express.Router();

userRouter.get('/me',authenticateToken,getMe)

export default userRouter