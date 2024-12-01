import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../utils/constants.js";
import Login from '../Models/login.model.js';
import { comparePasswords } from '../Utils/pass_Hash.js';


const userlogin = async (req, res) => {

    const { email, password } = req.body;
  
    try {
      const userData = await Login.getUserByEmail(email);
      if (!userData) {
        return res.status(404).json({ MSG: "User Not Found" });
      }
  
      const { user, role, id_key } = userData;
      console.log(role,user[id_key],user)
      

      //use comparePasswords(password, user.password) after a signup is done till then for dummy data do simple compare
      if (password === user.password || comparePasswords(password, user.password)){
        const token = jwt.sign({ email: user.email, id: user[id_key]}, SECRET_KEY);
        // Return response
        return res.status(200).json({
          email: user.email,
          type: role,
          token,
        });
      } 
      else {
        return res.status(401).json({ MSG: "Invalid Password" });
      }
    } catch (error) {
      console.error("Error in /userlogin endpoint:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  export { userlogin };
