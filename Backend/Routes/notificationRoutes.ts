import express,{Router} from 'express'
import { authenticateToken } from '../Middleware/authMiddleware.ts'
import { getNotifications, markNotificationAsRead } from '../Controllers/notificationController.ts'

const notificationRouter=Router() 

notificationRouter.get('/',authenticateToken,getNotifications)
notificationRouter.put('/:id/read',authenticateToken,markNotificationAsRead)


export default notificationRouter
