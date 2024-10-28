import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';



function StudentList() {
  const [students, setStudents] = useState( [
    { name: "Iayan Jaber", AssignedAt: "Asia/Riyadh: GMT+3", Grade: "Grade/Year 12", type: 'online' },
    { name: "Niki Shrivastava", AssignedAt: "Asia/Dubai: GMT+4", Grade: "Grade/Year 10th to 11th", type: 'home' },
    { name: "Abdulaziz Alamoudi", AssignedAt: "Asia/Riyadh: GMT+3", Grade: "Grade/Year 6th to 9th", type: 'online' },
  ]);
  const [search, setSearch] = useState("");
  const [displayedStudents, setDisplayedStudents] = useState(students);

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
  }, [search]);

// use this part for api call for student data
  // useEffect(()=>{
  //   fetch()
  //   .then((res)=>res.json())
  //   .then((data)=>setStudents(data))
  //   .catch((error)=> console.log(error))
  // },[])

  return (
    
    <div className="p-8">
      <h2 className="text-white text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 bg-gradient-to-r from-orange-700 to-orange-400 shadow-lg p-2 rounded">My Students</h2>
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
                <td className="py-3 px-6 text-left text-blue-500 hover:underline">{student.name}</td>
                <td className="py-3 px-6 text-left">{student.AssignedAt}</td>
                <td className="py-3 px-6 text-left">{student.Grade}</td>
                <td className="py-3 px-6 text-left">{student.type}</td>
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
    </div>
  );
};

export default StudentList;

