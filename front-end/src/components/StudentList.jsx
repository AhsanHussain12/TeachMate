import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

// [
//   { name: "Iayan Jaber", AssignedAt: "Asia/Riyadh: GMT+3", Grade: "Grade/Year 12", type: 'online' },
//   { name: "Niki Shrivastava", AssignedAt: "Asia/Dubai: GMT+4", Grade: "Grade/Year 10th to 11th", type: 'home' },
//   { name: "Abdulaziz Alamoudi", AssignedAt: "Asia/Riyadh: GMT+3", Grade: "Grade/Year 6th to 9th", type: 'online' },
// ]


function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [displayedStudents, setDisplayedStudents] = useState(students);
  const [loading, setLoading] = useState(true)

  
  const fuse = new Fuse(students, {
    keys: ['name', 'Grade', 'type'],  // Fields to search
    threshold: 0.3,                         // Tolerance level
  });  



//fuse used here for more accurate search results based on different fields
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.trim() === "") {
        setDisplayedStudents(students);
      } else {
        const results = fuse.search(search).map(result => result.item);
        setDisplayedStudents(results);
      }
    }, 300);  // Debounce delay

    return () => clearTimeout(handler); // Clear timeout on component unmount or new search
  }, [search,students]);


  useEffect(() => {
    const fetchData = async () => {
        const url = 'http://localhost:3000/api/v1/teacher/get/students'; // Replace with your API endpoint
        const token = sessionStorage.getItem('jwtToken');
    
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`, // Adding the JWT token in Authorization header
                },
            });
            console.log(response.data);
            setStudents(response.data);

        } 
        catch (error) {
            console.error('Error fetching data:', error.response?.data || error.message);
            alert('Error fetching data:', error.response);
        }
        finally {
            setLoading(false); // Hide loading spinner when data is fetched or fetched fails
        }
    };
    fetchData(); 
},[])

  return (
    
    <div className="p-8">
      <h2 className="text-white text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 bg-gradient-to-r from-orange-700 to-orange-400 shadow-lg p-2 rounded">My Students</h2>
      {loading ? (
          <div className="flex items-center justify-center h-full">
          <ClipLoader color="#3498db" loading={loading} size={50} />
          </div>
      ):(
        <>
      <input
        type="text"
        placeholder="Search a student..."
        className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm hover:shadow-md"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Student Name</th>
              <th className="py-3 px-6 text-left">Assigned At</th>
              <th className="py-3 px-6 text-left">Grade</th>
              <th className="py-3 px-6 text-left">Type</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {displayedStudents.map((student, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left text-blue-500 hover:underline">{student.fullName}</td>
                <td className="py-3 px-6 text-left">{
                new Date(student.assignedDate).toLocaleString("en-GB", {
                  dateStyle: "short",
                })  
                }</td>
                <td className="py-3 px-6 text-left">{student.currentClass}</td>
                <td className="py-3 px-6 text-left">{student.gigType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end text-gray-600 text-sm">
        <p>Items per page:</p>
        <select className="ml-2 border border-gray-300 rounded p-1">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
          <span className="ml-4">1 - {displayedStudents.length} of {students.length}</span>
      </div>        
        </>
      )}

    </div>
  );
};

export default StudentList;

