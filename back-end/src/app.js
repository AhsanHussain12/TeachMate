import express from "express";
import cors from "cors";
import {request} from "./Middlewares/request.js"
import Teacher from "./Models/teacher.model.js";


const app=express();

app.use(express.json());
app.use(cors())
app.use(request) 

// Define routes
app.get('/data', Teacher.getTutorProfile)

// import routes
import teacherRouter from "./Routes/teacher.routes.js";
// import studentRouter from "./Routes/student.routes.js";



app.use('/api/v1/teacher',teacherRouter)
// app.use('/api/v1/student',studentRouter)

export default app;