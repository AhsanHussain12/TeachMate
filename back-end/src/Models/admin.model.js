import db from "../index.js"
import { generatehashPassword } from "../Utils/pass_Hash.js"


const Admin = {
    getAdminAssignedGigs: async(adminId)=>{
        const data = await new Promise((resolve, reject) => {
            db.query(`
                select 
                AGA.gigId,
                G.gigTitle,
                G.details,
                G.expectedFee,
                G.gigType,
                G.createdAt
                from AdminGigAssignment AGA
                inner join Gig G on AGA.gigId=G.gigId
                where AGA.adminId=? and G.status='open';`,[adminId],(err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
        return data; // array of objects [{},{}]
    },
    getUnassignedGigs: async () => {
        const data = await new Promise((resolve, reject) => {
            db.query(`
                    SELECT 
                    G.gigId,
                    G.gigTitle,
                    G.details,
                    G.expectedFee,
                    G.gigType,
                    G.createdAt
                    FROM 
                    Gig G
                    LEFT JOIN 
                    AdminGigAssignment AGA ON G.gigId = AGA.gigId
                    WHERE 
                    AGA.gigId IS NULL; `,(err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
        return data; // array of objects [{},{}]
    },

    getAllAdmins: async()=>{
    const data = await new Promise((resolve, reject) => {
        db.query(`SELECT adminId,fullname,email,phoneNumber,designation FROM Admin`,(err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
    return data; // array of objects [{},{}]
    },

    removeAdmin: async (adminId)=>{
        const data = await new Promise((resolve, reject) => {
            db.query(`DELETE FROM Admin WHERE adminId=?;`,[adminId],(err) => {
                if(err) reject(0)
                else resolve(1) // successful deletion
            })
        });
        return data; // 1 for success, 0 for failure
    },

    AddAdmin: async (designation,email,fullName,password,phoneNumber)=>{
        const hashedPassword = generatehashPassword(password)
        const data = await new Promise((resolve, reject) => {
            db.query(`INSERT INTO admin (fullName, email, phoneNumber, password, designation) VALUES (?,?,?,?,?);`,
                [fullName, email, phoneNumber, hashedPassword, designation],(err) => {
                if(err) reject(0)
                else resolve(1) // successful deletion
            })
        });
        return data; // 1 for success, 0 for failure
    },

    getAdminName : async (adminId) =>{
        const data = await new Promise((resolve,reject)=>{
            db.query(`SELECT fullName,designation FROM Admin WHERE adminId=?;`,[adminId],(err, result) => {
                if(err){
                    console.error(err);
                    reject(err)
                } 
                resolve(result)
            })
        })
        console.log(data[0])
        return data[0]; // [{}]
    },
}
// 
export default Admin;