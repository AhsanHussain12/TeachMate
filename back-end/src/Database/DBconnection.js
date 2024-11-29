import mysql from "mysql2"
import { DBNAME, PASSWORD } from "../utils/constants.js";


 const getDBconnection=()=>{
    const DB= mysql.createConnection({
        host: "localhost",
        user: "root",
        password: `${PASSWORD}`,
        database: `${DBNAME}`
    });
    return DB;
}
 export default getDBconnection;