import {Request,Response} from 'express'
import {pool} from '../db/dbIntiliaze.ts'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../config/index.ts'
import { QueryResult } from 'pg'


//fetch curr user  /me  
export const getMe=async(req:Request,res:Response)=>{
   try{
       if(!req.user?.id){
        res.status(401).json({message:'user not authenticated'})
        return ;
       }
       const result:QueryResult=await pool.query('SELECT id,username FROM users WHERE id=$1 ',[req.user.id])
       if(result.rows.length==0){
        res.status(404).json({message:'user not found'})
        return ;
       }
       res.status(200).json({user:result.rows[0]})
   }catch(err){
       console.error('error fetching user',err)
       res.status(500).json({message:'internal server error'})
   }
}

