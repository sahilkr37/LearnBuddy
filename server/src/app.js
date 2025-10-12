import express from 'express'
import { connectDB } from './config/database.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

import authRouter from './routes/auth.js'
import profileRouter from './routes/profile.js'
import connectionRouter from './routes/connectionRequest.js';
import userRouter from './routes/user.js';

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', connectionRouter)
app.use('/', userRouter)



connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
}).catch((err) => {
    console.log('Error in DB connection')
})

