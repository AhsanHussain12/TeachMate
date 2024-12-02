import db from "../index.js"
import { generatehashPassword } from "../Utils/pass_Hash.js"

const Student = {
    

    createGig: async (studentId, gigTitle, studentsInstitute, studentArea, expectedFee, details, gigType) => {
        const currentDate = new Date().toISOString().split('T')[0]; // Get the current date (in format YYYY-MM-DD)
    
        const data = await new Promise((resolve, reject) => {
            db.query(`
                INSERT INTO Gig (
                    studentId, gigTitle, studentsinstitute, studentArea, expectedFee, createdAt, status, details, gigType
                ) 
                VALUES (?, ?, ?, ?, ?, ?, 'open', ?, ?);`, 
                [studentId, gigTitle, studentsInstitute, studentArea, expectedFee, currentDate, details, gigType], 
                (err) => {
                    if (err) reject(err);
                    else resolve({ message: 'Gig created successfully' });
                }
            );
        });
    
        console.log(data);
        return data;
    },
    

    getStudentProfile: async (student_id) => {
        const data = await new Promise((resolve, reject) => {
            db.query(`
                SELECT 
                    fullName,
                    phoneNum,
                    email,
                    gender,
                    educationalStatus,
                    currentClass,
                    regDate
                FROM Student
                WHERE studentId = ?;`, [student_id], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        console.log(data);
        return data;
    },
    

    getHomeTutionsCount: async (student_id) => {
        const data = await new Promise((resolve, reject) => {
            db.query(`
                SELECT 
                    COUNT(DISTINCT STA.tutorId) AS count
                FROM studenttutorassignment STA
                INNER JOIN Gig G ON G.gigId = STA.gigId
                WHERE G.gigType = "home" AND STA.studentId = ?;`, [student_id], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        console.log(data);
        return data[0];
    },
    

    getOnlineTutionsCount: async (student_id) => {
        const data = await new Promise((resolve, reject) => {
            db.query(`
                SELECT 
                    COUNT(DISTINCT STA.tutorId) AS count
                FROM studenttutorassignment STA
                INNER JOIN Gig G ON G.gigId = STA.gigId
                WHERE G.gigType = "online" AND STA.studentId = ?;`, [student_id], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        console.log(data);
        return data[0];
    },
    

    getAllTutionsCount: async (student_id) => {
        const data = await new Promise((resolve, reject) => {
            db.query(`
                SELECT 
                    COUNT(DISTINCT STA.tutorId) AS count
                FROM studenttutorassignment STA
                INNER JOIN Gig G ON G.gigId = STA.gigId
                WHERE STA.studentId = ?;`, [student_id], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        console.log(data);
        return data[0];
    },
    

    getAllGigs: async (tutor_id) => {
        const data = await new Promise((resolve, reject) => {
            db.query(`
                SELECT 
                    G.gigId,
                    G.gigTitle,
                    G.details,
                    G.gigType,
                    G.studentArea,
                    G.createdAt,
                    G.expectedFee,
                    G.status
                FROM 
                    Gig G
                JOIN 
                    TutorGigApplication TGA ON G.gigId = TGA.gigId
                WHERE 
                    TGA.tutorId = ?  -- tutor's ID
                    AND (G.status = 'open' OR G.status = 'closed');`, [tutor_id], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        console.log(data);
        return data;
    },
    
    
    getStudentPassword: async (student_id) => {
        const data = await new Promise((resolve, reject) => {
            db.query(`
                SELECT password
                FROM Student
                WHERE studentId=?;`, [student_id], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        console.log(data);
        return data[0].password;
    },

    storeStudentPassword: async (student_id, newPassword) => {
        const hashedPassword = generatehashPassword(newPassword);
        const data = await new Promise((resolve, reject) => {
            db.query(`
                UPDATE Student
                SET password=?
                WHERE studentId=?;`, [hashedPassword, student_id], (err) => {
                if (err) reject(err);
                else resolve({ message: 'Password changed' });
            });
        });
        console.log(data);
        return data;
    },

    getStudentName: async (student_id) => {
        const data = await new Promise((resolve, reject) => {
            db.query(`
                SELECT fullName
                FROM Student
                WHERE studentId=?;`, [student_id], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        console.log(data);
        return data[0].fullName;
    },

    editProfile: async (student_id, fullName, phoneNum) => {
        const data = await new Promise((resolve, reject) => {
            db.query(`
                UPDATE Student
                SET fullName=?, phoneNum=?
                WHERE studentId=?;`, [fullName, phoneNum, student_id], (err) => {
                if (err) reject(0);
                else resolve(1);
            });
        });
        console.log(data);
        return data;
    },

    signUp: async (inputData) => {
        const { fullName, email, password, gender, phoneNum } = inputData;
        const hashedPassword = generatehashPassword(password);
        const currentDate = new Date().toISOString().split('T')[0];
        console.log(fullName, email, hashedPassword, gender, phoneNum, currentDate);
        const data = await new Promise((resolve, reject) => {
            db.query(`
                INSERT INTO Student (fullName, email, password, gender, phoneNum, regDate)
                VALUES (?,?,?,?,?,?)`, [fullName, email, hashedPassword, gender, phoneNum, currentDate], (err) => {
                if (err) reject(0);
                else resolve(1);
            });
        });
        return data;
    },

    getStudentByEmail: async (email) => {
        const data = await new Promise((resolve, reject) => {
            db.query(`SELECT email, studentId FROM Student WHERE email= ?`, [email], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        console.log(data);
        return data;
    },

}

export default Student;