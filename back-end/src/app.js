import express from "express";
import cors from "cors";
import {request} from "./Middlewares/request.js"
import Teacher from "./Models/teacher.model.js";
import authenticate  from "./Middlewares/authentication.js";

const app=express();

app.use(express.json());
app.use(cors())
app.use(request) 

// Define routes
app.get('/data', Teacher.getTutorProfile)

// import routes
import teacherRouter from "./Routes/teacher.routes.js";
import GigRouter from "./Routes/gig.routes.js";
import loginRouter from "./Routes/login.routes.js";
import adminRouter from "./Routes/admin.routes.js";
// import studentRouter from "./Routes/student.routes.js";



app.use('/api/v1/teacher',teacherRouter)
app.use('/api/v1/gig',GigRouter)
app.use('/api/v1/login',loginRouter)
app.use('/api/v1/admin',adminRouter)
// app.use('/api/v1/student',studentRouter)

export default app;