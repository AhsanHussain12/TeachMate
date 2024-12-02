import db from "../index.js"
import getDate from "../Utils/Date.js"

const AdminGigAssignment = {
    AssignGigToAdmin: async (gigId,adminId) =>{
        console.log("hereIn");
        const result = await new Promise((resolve, reject) =>{
            const date = getDate()   
            db.query(`INSERT INTO AdminGigAssignment (gigId,adminId,assignedDate) VALUES (?,?,?)`,[gigId,adminId,date],(err) => {
                if(err){
                    reject(0)
                    console.log(err)
                } 
                else resolve(1) // successful insert
            })
        })
        console.log("resule",result)
        return result // 1 for success, 0 for failure
    }
}

export default AdminGigAssignment;