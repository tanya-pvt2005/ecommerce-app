import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'

//APP CONFIG
const app = express()
const port = process.env.PORT || 4000

// Connections
connectDb()
connectCloudinary()

//Middlewares
app.use(express.json())
app.use(cors())

//API Endpoints
app.get('/',(req,res)=>{
    res.send("API Working")
})


// API endpoints
app.use('/api/user', userRouter)

app.listen(port, ()=>{
    console.log('Server started on port: '+port)
})