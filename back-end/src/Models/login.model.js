import db from "../index.js"

const Login = {
    getUserByEmail : async (email) => {
        try {
          const queries = [
            { table: 'tutor', role: 'teacher' , id_key: "tutorId" },
            { table: 'student', role: 'student', id_key: "studentId" },
            { table: 'admin', role: 'admin', id_key: "adminId" }
          ];
      
          for (let { table, role, id_key } of queries) {
            const data = await new Promise((resolve, reject) => {
              db.query(`SELECT ${id_key} , email , password FROM ${table} WHERE email = ?`, [email], (err, data) => {
                if (err) return reject(err);
                resolve(data);
              });
            });
      
            if (data.length !== 0) {
              return { user: data[0] , role, id_key: id_key };
            }
          }
      
          return null; // If no match found

        } catch (err) {

          console.error(err);
          throw new Error('Database query failed');

        }
      },
}

export default Login;