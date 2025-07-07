import express,{Router} from 'express'
import { authenticateToken } from '../Middleware/authMiddleware.ts'
import { createComment, deleteComment, getAllComments, restoreDeletedComment, updateComment } from '../Controllers/commentController.ts'
import { asyncHandler } from '../HelperFunctions/asyncHandler.ts';

const commentRouter=Router() 


commentRouter.post('/', authenticateToken, asyncHandler(createComment));
commentRouter.get('/', asyncHandler(getAllComments));
commentRouter.put('/:id', authenticateToken, asyncHandler(updateComment));
commentRouter.delete('/:id', authenticateToken, asyncHandler(deleteComment));
commentRouter.put('/:id/restore', authenticateToken, asyncHandler(restoreDeletedComment));



export default commentRouter