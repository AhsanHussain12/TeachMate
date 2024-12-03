import db from "../index.js"

const StudentTutorAssignment = {
    assignTeacherToStudent : async (gigId,tutorId) => {
        const studentId = await new Promise((resolve, reject) =>{
            db.query("SELECT studentId FROM Gig where gigId = ?",[gigId],(err,result)=>{
                if (err) reject(0)
                else resolve(result[0].studentId); // [{studentId: 12}]
                
            })
        })
        console.log("Student found: " + studentId)
        // studentId=0 makes it automatically false
        if(studentId){
            console.log(`Making Insert for ${studentId} ${gigId} ${tutorId}`)
            const currentDate = new Date().toISOString().split('T')[0];
            const insert = await new Promise((resolve,reject)=>{
                db.query("INSERT INTO StudentTutorAssignment (studentId,gigId,tutorId,assignedDate) VALUES (?,?,?,?)",[studentId,gigId,tutorId,currentDate],(err)=>{
                    if (err) {
                        console.error("Error during INSERT:", err); // Add this
                        reject(0); 
                    } else {
                        resolve(1);
                    }
                });
            })
            console.log("Insert Status" + insert)
            return insert;  // 1 for success
        }
        return 0; // for failure
    }
}

export default StudentTutorAssignment; 
