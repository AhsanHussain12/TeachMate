import { Router } from "express";
import { userlogin } from "../Controllers/login.controller.js";


const loginRouter = new Router(); 


loginRouter.route('/validate').post(userlogin)

export default loginRouter;