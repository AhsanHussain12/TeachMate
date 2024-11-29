import app from "./app.js";
import getDBconnection from "./Database/DBconnection.js";
import { PORT } from "./Utils/constants.js";



const db = getDBconnection();
db.connect((err)=>{
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
        }
    console.log("Connected to MySQL DATABASE");
    
})

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Server is running on PORT ${PORT}`);
});

export default db;