import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {JWT_SECRET}  from '../config/index'

export const authenticateToken=(req:Request,res:Response,next:NextFunction):void=>{
       const authHeader=req.headers['authorization']
       const token=authHeader && authHeader.split(' ')[1]

       if(!token){
        res.status(401).json({message:'Authentication token required'})
        return 
       }

       jwt.verify(token,JWT_SECRET,(err,user)=>{
         if(err){
            console.error("jwt verification error",err)
            res.status(403).json({message:'invalid or expired token'})
         }
         req.user=user as { id:number ;username:string}
         next() 
       })
}