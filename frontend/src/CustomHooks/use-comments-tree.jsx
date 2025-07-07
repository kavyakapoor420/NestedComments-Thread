import React,{useState} from 'react'

const useCommentsTree = (initialComments) => {

   const [comments,setComments]=useState(initialComments)
   
   const newComment={
      id:Date.now() ,
      content,
      votes:0,
      timestamps:new Date().toISOString,
      replies:[]
   }

   const insertNode=(tree,commentId,content)=>{
     return tree.map((comment)=>{
        if(comment.id===commentId){
            return{
                ...comment,
                replies:[...comment.replies,content]
            }
        }else if( comment.replies && comment.replies.length>0){

        }
     })
   }

   const insertComment=(commentId,content)=>{
     if(commentId){ //add a new reply 
        setComments((prevComments)=>insertNode(prevComments,commentId,newComment))
     }else{
        setComments(prevComments=[newComment,...prevComments])
     }
   }

  return (
    <div>

    </div>
  )
}

export default useCommentsTree 