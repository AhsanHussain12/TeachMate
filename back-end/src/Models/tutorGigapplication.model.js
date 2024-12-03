import db from "../index.js"


const TutorGigApplication = {
    getTutorsOfGig: async(gigId,calledFor)=>{
        let query;
        if(calledFor === 'admin'){
            query = `
                    select 
                    TGA.tutorId,
                    T.fullName,
                    T.phoneNum,
                    T.gender, 
                    T.regDate
                    from tutor T
                    inner join TutorGigApplication TGA on TGA.tutorId=T.tutorId
                    where TGA.gigId = ? and TGA.applicationStatus='pending';`
        }
        else if(calledFor === 'student'){
            query = `
            SELECT
            TGA.tutorId,
            T.fullName,
            TGA.applicationStatus
            from tutor T
            inner join TutorGigApplication TGA on TGA.tutorId=T.tutorId
            where TGA.gigId =? ;
            `
        }
        const data = await new Promise((resolve, reject) => {
            db.query(query,[gigId],(err, result) => {

                if(err) reject(err)
                else resolve(result)
            })
        })
        return data; // array of objects [{},{}]
    },
    setApplicationStatus: async(tutorId,gigId,status) =>{
        console.log("Setting application status ",tutorId,gigId,status)
        const data = await new Promise((resolve, reject) => {
            db.query(`UPDATE TutorGigApplication SET applicationStatus=? WHERE tutorId=? and gigId=?`,[status,tutorId,gigId],(err) => {
                if(err) reject(0)
                else resolve(1) // successful update
            })
        });
        console.log("ApplicationStatus ",data)
        return data; // 1 for success, 0 for failure
    },

}

export default TutorGigApplication;