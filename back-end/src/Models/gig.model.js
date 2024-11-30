import db from "../index.js"

const GIG = {

    getDetails: async(gigId)=>{
        const data = await new Promise((resolve, reject) => {
            db.query(`
                SELECT 
                S.fullName,
                G.gigTitle,
                G.studentsInstitute,
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
        return data[0]; //return an object instead of an array
    },

    applyToGig: async (gigId,tutorId) => {
        const formattedDate = new Date().toISOString().split('T')[0];
        const data = await new Promise((resolve, reject) => {
            db.query(`
                INSERT INTO TutorGigApplication (gigId,tutorId,applicationStatus,appliedAt)
                VALUES(?,?,?,?)
            `,[gigId,tutorId,'pending',formattedDate],(err,data) => {
                if (err) reject(0) // insertion failed
                resolve(1) // successfull inserted
            })
        })
        console.log(data)
        return data;
    }
}

export default GIG;