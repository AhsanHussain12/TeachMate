import db from "../index.js"
import { generatehashPassword } from "../Utils/pass_Hash.js"

const Teacher = {
    getTutorstudents: async (tutor_id) =>{
        const data = await new Promise((resolve, reject) =>{
            db.query(`SELECT 
                        S.fullName,
                        S.currentClass,
                        STA.assignedDate,
                        G.gigType
                    FROM 
                        Student S
                    INNER JOIN 
                        StudentTutorAssignment STA ON STA.studentId = S.studentId
                    INNER JOIN 
                        Gig G ON G.gigId = STA.gigId  -- Join on gigId, not studentId
                    WHERE 
                        STA.tutorId = ?;`,[tutor_id],(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
        console.log(data)
        return data;
    },

    getTutorAppliedGigs: async (tutor_id)=>{
        const data = await new Promise((resolve, reject)=>{
            db.query(`
                SELECT 
                G.gigId,
                G.gigTitle,
                G.gigType,
                G.studentArea,
                TGA.applicationStatus,
                TGA.appliedAt
                FROM 
                Gig G
                INNER JOIN
                TutorGigApplication TGA on G.gigId=TGA.gigId
                where TGA.tutorId=?;`,[tutor_id],(err,data)=>{
                
                if(err) reject(err)

                else resolve(data)
            })
        })
        console.log(data)
        return data;
    },

    getTutorProfile: async (tutor_id)=>{
        const data = await new Promise((resolve, reject)=>{
            db.query(`
                    SELECT 
                    fullName,
                    phoneNum,
                    email,
                    gender
                    FROM Tutor 
                    WHERE tutorId=?;`,[tutor_id],(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
        console.log(data)
        return data;
    },

    getHomeTutionsCount: async (tutor_id)=>{
        const data = await new Promise((resolve, reject)=>{
            db.query(`
                SELECT 
                COUNT(DISTINCT STA.studentId) AS count
                FROM studenttutorassignment STA
                inner join Gig G on G.gigId= STA.gigId
                WHERE G.gigType="home" and  tutorId=?;`,[tutor_id],(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
        console.log(data)
        return data[0];
    },

    getOnlineTutionsCount: async (tutor_id)=>{
        const data = await new Promise((resolve, reject)=>{
            db.query(`
                SELECT 
                COUNT(DISTINCT STA.studentId) AS count
                FROM studenttutorassignment STA
                inner join Gig G on G.gigId= STA.gigId
                WHERE G.gigType="online" and  tutorId=?;`,[tutor_id],(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
        console.log(data)
        return data[0];
    },

    getAllStudentCount: async (tutor_id)=>{
        const data = await new Promise((resolve, reject)=>{
            db.query(`
                SELECT 
                COUNT(DISTINCT STA.studentId) AS count
                FROM studenttutorassignment STA
                inner join Gig G on G.gigId= STA.gigId
                where tutorId=? ;`,[tutor_id],(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
        console.log(data)
        return data[0];
    },

    getAllGigs: async (tutor_id)=>{
        const data = await new Promise((resolve, reject)=>{
            db.query(` 
                    SELECT 
                        G.gigId,
                        G.gigTitle,
                        G.details,
                        G.gigType,
                        G.studentArea,
                        G.createdAt,
                        G.expectedFee
                    FROM Gig G
                    LEFT JOIN TutorGigApplication TGA ON TGA.gigId = G.gigId AND TGA.tutorId = ? -- Check for the specific tutor's applications
                    LEFT JOIN AdminGigAssignment AGA ON AGA.gigId = G.gigId
                    WHERE 
                        AGA.gigId IS NOT NULL -- Only gigs assigned to an admin
                        AND G.status = 'open' -- Gigs must be open
                        AND (TGA.tutorId IS NULL); -- Exclude gigs already applied by this tutor

                `,[tutor_id],(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
        console.log(data)
        return data;
    },
    
    getTeacherPassword: async (tutor_id)=>{
        const data = await new Promise((resolve, reject)=>{
            db.query(`
                SELECT password
                FROM Tutor
                WHERE tutorId=?;`,[tutor_id],(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
        console.log(data)
        return data[0].password;
    },

    storeTeacherPassword: async (tutor_id,newPassword)=>{
        const hashedPassword = generatehashPassword(newPassword)
        const data = await new Promise((resolve, reject)=>{
            db.query(`
                UPDATE Tutor
                SET password=?
                WHERE tutorId=?;`,[hashedPassword,tutor_id],(err)=>{
                if(err) reject(err)
                else resolve({message: 'Password changed'})
            })
        })
        console.log(data)
        return data;
    },

    getTeacherName: async (tutor_id)=>{
        const data = await new Promise((resolve, reject)=>{
            db.query(`
                SELECT fullName
                FROM Tutor
                WHERE tutorId=?;`,[tutor_id],(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
        console.log(data)
        return data[0].fullName;
    },

    editProfile: async (tutor_id,fullName,phoneNum) => {
        const data = await new Promise((resolve, reject)=>{
            db.query(`
                UPDATE Tutor
                SET fullName=?, phoneNum=?
                WHERE tutorId=?;`,[fullName, phoneNum, tutor_id],(err)=>{
                if(err) reject(0)
                else resolve(1)
            })
        })
        console.log(data)
        return data;
    },

    signUp: async (inputData) => {
        const {fullName,email,password,gender,phoneNum} = inputData
        const hashedPassword = generatehashPassword(password);
        const currentDate = new Date().toISOString().split('T')[0];
        console.log(fullName, email, hashedPassword, gender, phoneNum,currentDate);
        const data = await new Promise((resolve, reject) => {
            db.query(`
                INSERT INTO Tutor (fullName, email, password, gender, phoneNum, regDate)
                VALUES (?,?,?,?,?,?)`,[fullName, email, hashedPassword, gender, phoneNum,currentDate],(err)=>{
                if(err) reject(0)
                else resolve(1)
            })
        })
        return data;
    },

    getTeacherByEmail: async (email) => {
        const data = await new Promise((resolve, reject) => {
            db.query(`SELECT email,tutorId from tutor where email= ?`,[email],(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
        console.log(data)
        return data;
    },

}

export default Teacher;