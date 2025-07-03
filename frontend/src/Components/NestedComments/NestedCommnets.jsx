import React, { useState } from 'react'
import useCommentsTree from '../CustomHooks/use-comments-tree'
import Comments from './Comments'
import commentsData from '../../data/comments.json'

const NestedCommnets = ({
    commments,
    onSubmit=()=>{},
    onEdit=()=>{},
    onDelete=()=>{}
}) => {
 
    const {comments:commentsData}=useCommentsTree(commments)
    const [comments,setComments]=useState("")

    const handleChange=(e)=>{
        setComments(e.target.value)
    }
    const handleReply=()=>{

    }
    const handleSubmit=()=>{
        if(comments){
            setComments('')
        }
    }
  return (
    <div>
        <div className='add-comment'>
            <textarea value={comments} onChange={handleChange} rows={3} cols={50} placeholder='add a new comment' className='bg-blue-500 text-2xl text-white comment-textarea'/>
            <button className='comment-button bg-yellow-700 text-2xl p-2 border-2 border-red-500' onClick={handleSubmit} >
                Add Comment
            </button>
        </div>

        {
            commentsData.map((comments)=>{
            <Comments key={comments.id} comments={comments} onSubmitComment={handleChange}/>
            })
        }

    </div>
  )
}

export default NestedCommnets