import db from "../index.js"

const GIG = {

    getGigDetails: async(gigId)=>{
        const data = await new Promise((resolve, reject) => {
            db.query(`
                SELECT 
                S.fullname,
                G.gigTitle,
                G.studentInstitute,
                G.studentArea,
                G.expectedFee,
                G.createdAt,
                G.details,
                G.gigType    
                from Gig G 
                inner join Student S on S.studentId = G.studentId
                where G.gigId = ?
            `,[gigId],(err,data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
        console.log(data[0])
        return data[0]
    },

    applyToGig: async (gigId,tutorId) => {
        const formattedDate = new Date().toISOString().split('T')[0];
        const data = await new Promise((resolve, reject) => {
            db.query(`
                INSERT INTO TutorGigApplication (gigId,tutorId,applicationStatus,appliedAt)
                VALUES(?,?,?,?)
            `,[gigId,tutorId,'pending',formattedDate],(err,data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
        console.log(data)
        return data.insertId;
    }
}

export default {GIG};