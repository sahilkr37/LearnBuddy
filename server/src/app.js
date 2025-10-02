import express from 'express'
import { connectDB } from './config/database.js'
import cookieParser from 'cookie-parser'
const app = express()
app.use(express.json());
app.use(cookieParser())

import authRouter from './routes/auth.js'
import profileRouter from './routes/profile.js'

app.use('/', authRouter)
app.use('/', profileRouter)



connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
}).catch((err) => {
    console.log('Error in DB connection')
})

