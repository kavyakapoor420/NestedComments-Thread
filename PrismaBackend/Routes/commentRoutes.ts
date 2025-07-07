import express,{Router} from 'express'
import { authenticateToken } from '../Middleware/authMiddleware'
import { createComment, deleteComment, getAllComments, restoreDeletedComment, updateComment } from '../Controllers/commentController'
import { asyncHandler } from '../HelperFunctions/asyncHandler';

const commentRouter=Router() 


commentRouter.post('/', authenticateToken, asyncHandler(createComment));
commentRouter.get('/', asyncHandler(getAllComments));
commentRouter.put('/:id', authenticateToken, asyncHandler(updateComment));
commentRouter.delete('/:id', authenticateToken, asyncHandler(deleteComment));
commentRouter.put('/:id/restore', authenticateToken, asyncHandler(restoreDeletedComment));



export default commentRouter