import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import AuthRouter from './routes/AuthRoutes.js'
import UserRouter from './routes/UserRoutes.js'



const app = express()
const PORT = process.env.PORT ||4000 
const allowedOrigins = ['http://localhost:5173','https://mern-auth-frontend-5pdz.onrender.com']
//call the DB fun.
connectDB()



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:allowedOrigins,
    credentials: true,
}))


//API's Endpoints...........

app.get('/', (req, res)=>{
    res.send(`<h1> API's is Working... </h1>`)
})
app.use('/api/auth',  AuthRouter)
app.use('/api/user', UserRouter)






app.listen(PORT,()=>{
    console.log(`Server running on PORT : ${PORT}`)
})





