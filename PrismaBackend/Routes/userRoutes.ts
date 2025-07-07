import express,{Router} from 'express'
import { authenticateToken } from '../Middleware/authMiddleware'
import { getMe } from '../Controllers/userController'

const userRouter=Router()

userRouter.get('/me',authenticateToken,getMe)

export default userRouter