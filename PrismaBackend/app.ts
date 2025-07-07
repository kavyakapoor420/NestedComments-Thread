import express from 'express'
import cors from 'cors'
import { PORT,FRONTEND_URL } from './config'
import { initilizeDatabase } from './db/dbIntiliaze'


import userRouter from './Routes/userRoutes'
import commentRouter from './Routes/commentRoutes'
import notificationRouter from './Routes/notificationRoutes'

const app=express() 

app.use(cors({
    origin:FRONTEND_URL
}))
app.use(express.json())


app.use('/users',userRouter)
app.use('/comments',commentRouter)
app.use('/notfications',notificationRouter)


initilizeDatabase().then(()=>{
    app.listen(PORT,()=>{
        console.log(`connected to databas and server is listening on port ${PORT}`)
    })
}).catch((err)=>{
    console.error('failed to initilaize DB and SERVER',err)
})