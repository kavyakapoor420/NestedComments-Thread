const express = require('express');
const cors = require('cors');
const  axios =require('axios');


const { PORT, FRONTEND_URL } = require('./config/index.ts');
const { initilizeDatabase } = require('./db/dbIntiliaze.ts');

const userRouter = require('./Routes/userRoutes.ts');
const commentRouter = require('./Routes/commentRoutes.ts');
const notificationRouter = require('./Routes/notificationRoutes.ts');
const authRouter=require('./Routes/authRoutes.ts')

const app = express();

app.use(cors({
    origin: FRONTEND_URL,
}));

app.use(express.json());

app.use('/users', userRouter);
app.use('/auth',authRouter)
app.use('/comments', commentRouter);
app.use('/notfications', notificationRouter);

setInterval(() => {
  axios.get('https://deploy-project-2-hgpy.onrender.com/')
    .then(() => console.log('Self-ping to keep Render awake'))
    .catch((err) => console.error('Self-ping failed', err));
}, 5 * 60 * 1000); // every 5 minutes

initilizeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to database and server is listening on port ${PORT}`);
    });
}).catch((err:any) => {
    console.error('Failed to initialize DB and SERVER:', err);
});
