import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../utils/constants.js';

const authenticate=(req,res,next)=>{
    try {
        let token=req.headers.authorization
        console.log("MiddlewareToken-",token)
        if(token){
            token=token.split(" ")[1] // `Bearer ${token}` expecting this so split to remove Bearer
            const user=jwt.verify(token,SECRET_KEY)
            req.userId=user.id
            req.email=user.email
            console.log("authID--",req.userId)
        }
        else{
            res.status(401).json("Unauthorized Access from User")
        }
        next();

    } catch (error) {
        // verify fails false token
        console.log(`Error-[False token Access from User] ${error}`)
        res.status(401).json("Unauthorized Access from User")
    }

}

export default authenticate ;