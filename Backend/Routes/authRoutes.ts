import express,{Router} from 'express'
import { loginUser, registerUser } from '../Controllers/authController.ts'

const authRouter=Router() 

authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)

export default authRouter