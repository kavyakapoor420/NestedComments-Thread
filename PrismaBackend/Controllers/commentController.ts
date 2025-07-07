import {Request,Response} from 'express'
import {pool} from '../db/dbIntiliaze.ts'
import { GRACE_PERIOD_MINUTES } from '../config/index.ts'
import { QueryResult } from 'pg'


//cerate new comment -: post method   /comments

export const createComment=async(req:Request,res:Response)=>{
    const {content,parent_id}=req.body ;
    
    const userId=req.user?.id ;

    if(!userId){
        res.status(401).json({message:'user not authorized'})
        return ;
    }
    if(!content){
        res.status(400).json({message:"coment content required"})
    }

    let client;

    try{
        client=await pool.connect() 
        await client.query("BEGIN")

        const commentResult:QueryResult=await client.query(
            'INSERT INTO comments (user_id,parent_id,content) VALUES ($1,$2,$3) RETURNING *',
            [userId,parent_id || null,content]
        )

        const newComment=commentResult.rows[0] 

        if(parent_id){
            const parentCommentResult:QueryResult=await client.query(
                'SELECT user_id,content FROM comments WHERE id=$1',[parent_id]
            )
            const parentComment=parentCommentResult.rows[0]

            if(parentComment && parentComment.user_Id!==userId){
                await client.query(
                    'INSERT INTO notification (user_id,comment_id,reply_id,message) VALUES ($!,$2,$3,$4)',
                    [
                        parentComment.user_id,
                        parent_id,
                        newComment.id ,
                        `User ${req.user?.username} replied to your comment : "${parentComment.content.substring(0,50)}... "`,
                    ]
                )
            }
             await client.query("COMMIT")
             res.status(201).json({mesage:'comment created successfully ',comment:newComment})
        }
    }catch(err){
            if(client) await client.query("ROLLBACK")
            console.error('error creating comment',err)
            res.status(500).json({message:'inetrnal server error creating comment'})
    }
    finally{
        if(client)   client.release
    }
}

// retrieve all comment -: get /comments 
export const getAllComments=async(req:Request,res:Response)=>{
    try{
          const result:QueryResult=await pool.query(`
             SELECT c.id,c.user_id,u.username,c.parent_id,c.content,c.created_at,c.updated_at,c.deleted_at,c.is_deleted 
             FROM comments c
             JOIN users u ON c.user_id=u.id 
             ORDER BY c.created_at ASC 
            `)
          res.status(200).json(result.rows)
    }catch(err){
        console.error('error fetching comments',err)
        res.status(500).json({message:'internal server error fetching comments '})
    }
}


//edit a comment -: put method used  /comments/:id

export const updateComment=async(req:Request,res:Response)=>{
    const commentId=req.params.id ;
    const {content}=req.body ;
    const userId=req.user?.id ;

    if(!userId){
        res.status(401).json({message:'user not authenticated'})
        return ;
    }
    if(!content){
        res.status(400).json({message:"for updating comment content is required "})
        return ;
    }
    try{
        const result:QueryResult=await pool.query(
            'SELECT user_id,created_at,is_deleted FROM comments WHERE id=$1',
            [commentId]
        )
        const comment=result.rows[0] 

        if(!comment){
            res.status(403).json({message:' your are not authorized to edit this comment'})
            return ;
        }
        if(comment.is_deleted){
            res.status(400).json({message:'cannot edit a deleted comment'})
        }

        const createdAt=new Date(comment.created_at) ;
        const now=new Date() 
        const timeElapsed=(now.getTime()-createdAt.getTime())/(1000*60)

        if(timeElapsed>GRACE_PERIOD_MINUTES){
            res.status(403).json({message:`comment can only be edited within ${GRACE_PERIOD_MINUTES}`})
            return ; 
        }

        await pool.query(
            'UPDATE comments SET is_deleted=FALSE, deleted_at=NULL where id=$1',
             [commentId]
        )
        res.status(200).json({message:'comment restored successfully'})
    }catch(err){
        console.error('error restoring comment',err)
        res.status(500).json({message:'internal server error restoring comment '})
    }
}

//delete a comment -: /comments/:id 
export const deleteComment=async(req:Request,res:Response)=>{
    const commentId=req.params.id ;
    const userId=req.user?.id ;

    if(!userId){
        res.status(401).json({message:'user not authenticated'})
        return 
    }

    try{
         const result:QueryResult=await pool.query(
            'SELECT user_id,is_deleted FROM comments WHERE id=$1',
            [commentId]
         )
         const comment=result.rows[0]

         if(!comment){
            return res.status(404).json({message:'comment not found'})
         }
         if(comment.user_id!==userId){
            return res.json(403).json({message:'you are not authroized to delete this comment'})
         }
         if(comment.is_deleted){
            return res.status(400).json({message:"comment is aready deleted"})
         }

         await pool.query(
            `UPDATE comments SET is_deleted =TRUE ,deleted_at=CURRENT_TIMESTAMP where id=$1`,
             [commentId]
         )
         res.status(400).json({message:'comment  deleted successfully'})
    }catch(err){
         console.error('erro deleting comment',err)
         res.status(500).json({message:'internal server error while deleting comment'})
    }
}

export const restoreDeletedComment=async(req:Request,res:Response)=>{
    const commentId=req.params.id ;
    const userId=req.user?.id ;

    if(!userId){
        return res.json(401).json({message:"user not authenticated"})
    }
    try{
         const result:QueryResult=await pool.query(
            `SELECT user_id ,deleted_at,is_deleted FROM comments WHERE id=$1`,
            [commentId]
         )
         const comment=result.rows[0];

         if(!comment){
            return res.status(404).json({message:'comment not found'})
         }
         if(!comment.is_deleted){
            return res.status(400).json({message:"comment is not deleted"})
         }


         const deletedAt=new Date(comment.deleted_at)
         const now=new Date() 
         const timeElapsed=(now.getTime()-deletedAt.getTime())/(1000*60)
      

         if(timeElapsed>GRACE_PERIOD_MINUTES){
            return res.status(403).json({message:`comments can only be restored within ${GRACE_PERIOD_MINUTES} minutes `})
         }

         await pool.query(
            `UPDATE commenst SET is_deleted=FALSE,deleted_at=NULL WHERE id=$1 `,
             [commentId]
         )
         res.status(200).json({message:'commnet restored successfully'})
    }catch(err){
         console.error('error restoring comment',err)
         res.status(500).json({message:'internal server error restoring in comment'})
    }
}
