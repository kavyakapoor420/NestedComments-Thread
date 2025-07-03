import React, { useState } from 'react'

const Comments = ({
    comments={},onSubmitComment=()=>{}

}) => {

   const [expand,setExpand]=useState(false)
   const [replyContent,setReplyContent]=useState("")

   const handleChange=(e)=>{
     setReplyContent(e.target.value)
   }
   const toggleExpand=()=>{
    setExpand(!expand)
   }
   const handleReplySubmit=()=>{
     if(replyContent){
        setReplyContent("")
     }
   }

  return (
    <div>
        <p classsName='comment-content'>{commets.content}</p>
        <p className='comment-info'>Votes : {comments.votes}</p>
        <p className='comment-info'>
            {new Date(comments.timestamp).toLocaleString()}
        </p>
        

       <div className='comment-actions'>
           <button className='comment-button' onClick={toggleExpand}>
             {expand ? "Hide Replies" : "Reply"}
            </button>
           <button className='comment-button'>Edit</button>
           <button className='comment-button'>Delete</button>
       </div>

       {
        expand &&   
        <div className='comment-replies'>
            <div className="add-comment">
                <texrarea rows={3} cols={50} className='comment-textarea'
                   placeholder='add a new comment'
                   onChange={handleChange}
                />
                <button className='comment-button' onClick={handleReplySubmit}>
                  Add Comment
                </button>
            </div>

            {comments?.replies?.map((reply)=>{
                 return <Comments key={reply.id} comment={reply} onSubmitComment={onSubmitComment}/>
            })}
        </div>
        }

    </div>
  )
}

export default Comments