import {pool} from '../db/dbIntiliaze'
import { QueryResult } from 'pg'
import {Request,Response} from 'express'

// reterieve all notification of particular user -> /notifications /get 

export const getNotifications=async(req:Request,res:Response)=>{
    const userId=req.user?.id 

    if(!userId){
        res.status(401).json({message:'user not authenticated'})
        return 
    }

    try{
         const result:QueryResult=await pool.query(
            `SELECT n.id, n.comment_id,n.reply_id,n.message,n.is_read,n.created_at,c.content As original_comment_content,r.content As reply_content,ru.username AS reply_author_username
             FROM notifications n
             JOIN comments c ON n.comment_id=c.id 
             JOIN users ru ON r.user_id=ru.id 
             JOIN users ru ON r.user_id=ru.id 
             WHERE n.user_id=$1 
             ORDER BY n.created_at DESC
            `,[userId]
         )
       res.status(200).json(result.rows)
    }catch(err){
         console.error('error fetching notification',err)
         res.status(500).json({message:'internal server error fetching notification'})
    }
}


// mark notification as read -> /put /notifications/:id/read 
export const markNotificationAsRead=async(req:Request,res:Response)=>{
    const notificationId=req.params.id ;
    const userId=req.user?.id ;

    if(!userId){
        res.status(401).json({message:'user not authenticated'})
    }

    try{
         const result:QueryResult=await pool.query(
            `UPDATE notification SET is_read=TRUE WHERE id=$1 AND user_id=$2 RETURNING *`,
            [notificationId,userId]
         )
         if(result.rowCount===0){
            res.status(404).json({message:"notification not found or unauthorized "})
            return 
         }
    res.status(200).json({message:'notification marked as read',notification:result.rows[0]})
    }catch(err){
        console.error('error marking notifiction as read',err)
        res.status(500).json({message:"internal server error marking notification as read "})
    }
}