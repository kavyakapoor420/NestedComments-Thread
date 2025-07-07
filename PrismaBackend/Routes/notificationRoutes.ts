import express,{Router} from 'express'
import { authenticateToken } from '../Middleware/authMiddleware'
import { getNotifications, markNotificationAsRead } from '../Controllers/notificationController'

const notificationRouter=Router() 

notificationRouter.get('/',authenticateToken,getNotifications)
notificationRouter.put('/:id/read',authenticateToken,markNotificationAsRead)


export default notificationRouter
