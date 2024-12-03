import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';


function TeacherList() {
  const [teachers, setTeachers] = useState( []);
  const [search, setSearch] = useState("");
  const [displayedteachers, setDisplayedteachers] = useState(teachers);
  const [loading, setLoading] = useState(true)


  const fuse = new Fuse(teachers, {
    keys: ['name', 'Grade', 'type'],  // Fields to search
    threshold: 0.3,                         // Tolerance level
  });  


//fuse used here for more accurate search results based on different fields
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.trim() === "") {
        setDisplayedteachers(teachers);
      } else {
        const results = fuse.search(search).map(result => result.item);
        setDisplayedteachers(results);
      }
    }, 300);  // Debounce delay

    return () => clearTimeout(handler); // Clear timeout on component unmount or new search
  }, [search,teachers]);

  useEffect(() => {
    const fetchData = async () => {
        const url = 'http://localhost:3000/api/v1/student/get/teachers'; // Replace with your API endpoint
        const token = sessionStorage.getItem('jwtToken');
    
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`, // Adding the JWT token in Authorization header
                },
            });
            console.log(response.data);
            setTeachers(response.data);

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
      <h2 className="text-white text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 bg-gradient-to-r from-orange-700 to-orange-400 shadow-lg p-2 rounded">My teachers</h2>
      {loading ? (
          <div className="flex items-center justify-center h-full">
          <ClipLoader color="#3498db" loading={loading} size={50} />
          </div>
      ):(
      <>
      <input
        type="text"
        placeholder="Search a teacher..."
        className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm hover:shadow-md"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">teacher Name</th>
              <th className="py-3 px-6 text-left">Assigned At</th>
              <th className="py-3 px-6 text-left">GiG</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Contact Number</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {displayedteachers.map((teacher, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left text-blue-500 hover:underline">{teacher.fullName}</td>
                <td className="py-3 px-6 text-left">{                
                new Date(teacher.assignedDate).toLocaleString("en-GB", {
                dateStyle: "short",
                })}</td>
                <td className="py-3 px-6 text-left">{teacher.gigTitle}</td>
                <td className="py-3 px-6 text-left">{teacher.gigType}</td>
                <td className="py-3 px-6 text-left">{teacher.phoneNum}</td>
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
          <span className="ml-4">1 - {displayedteachers.length} of {teachers.length}</span>
      </div>
      </>
      )}
    </div>
  );
};

export default TeacherList;

