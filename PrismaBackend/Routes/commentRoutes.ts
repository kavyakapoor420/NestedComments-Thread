import express,{Router} from 'express'
import { authenticateToken } from '../Middleware/authMiddleware'
import { createComment, getAllComments, updateComment } from '../Controllers/commentController'

const commentRouter=Router() 

commentRouter.post('/',authenticateToken,createComment)
commentRouter.get('/',getAllComments)
commentRouter.put('/:id',authenticateToken,updateComment)



export default commentRouter