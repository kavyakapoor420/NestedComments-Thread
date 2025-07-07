import {Request,Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { QueryResult } from 'pg'
import { pool } from '../db/dbIntiliaze.ts'
import { JWT_SECRET } from '../config/index.ts'



export const registerUser=async(req:Request,res:Response)=>{
    const {username,email,password}=req.body 

    if(!username || !email ||  !password){
        res.status(400).json({message:'username ,email and  password are required'})
        return ; 
    }

    try{
      const hashedPassword=await bcrypt.hash(password,10)
      const result:QueryResult=await pool.query(
        'INSER INTO users (usernmae,email,password) VALUES ($1,$2,$3) RETURNING id,username,email,created_at',
        [username,email,hashedPassword]
      )
      res.status(201).json({message:'user registered successfully ',user:{id:result.rows[0].id,username:result.rows[0].username,email:result.rows[0].email}})

    }catch(err:any){
       if(err.code==='23505'){ //duplicate key error return 
          if(err.detail.includes('username')){
            res.status(409).json({message:"username already exists"})
          }else if(err.detail.include('email')){
            res.status(409).json({message:'email already exists'})
          }else{
            res.status(409).json({message:'duplicate entry detected'})
          }
          return ; 
       }
       console.error('error during registeration',err)
       res.status(500).json({message:"internal server during registeration"})
    }
}



export const loginUser=async(req:Request,res:Response)=>{
    const {email,password}=req.body ;

    if(!email || !password){
        res.status(400).json({message:'email and password required'})
        return ; 
    }

    try{
         const result:QueryResult=await pool.query('SELECT * FROM users WHERE email=$1',[email])
         const user=result.rows[0] 

         if(!user){
            res.status(400).json({message:'invalid email or password'})
            return ;
        }

        const isPassValid=await bcrypt.compare(password,user.password)
        if(!isPassValid){
            res.status(400).json({message:"invalid email or password"})
            return ; 
        }

        const token=jwt.sign({id:user.id,username:user.username,email:user.email},JWT_SECRET,{expiresIn:'1h'})

        res.status(200).json({message:"logged in successfully",token,user:{id:user.id,username:user.username,email:user.email}})
        
    }catch(err){
        console.error('error during login',err)
        res.status(500).json({message:'internal server error during login'})
    }
}