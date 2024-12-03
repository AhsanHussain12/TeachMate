import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import DashboardHeader from './subcomponents/DashboardHeader'
import { Outlet } from 'react-router-dom'

function StudentDashboard() {
  const [userName, setUsername] = useState(null)
  const token = sessionStorage.getItem('jwtToken'); // Get the token from local storage
  useEffect(() => {
  
    // get student name on opening dashboard and stores to sessionStorage in string already therefore no need to stringify
    fetch(`http://localhost:3000/api/v1/student/get/student-name`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Adding the JWT token in Authorization header
      },
    })
    .then((res) => res.ok? res.json(): Promise.reject('Failed to fetch Name'))
    .then(data => {
      console.log(typeof data)
      setUsername(data); // Updates the state with the fetched data
      sessionStorage.setItem('userName', data); // Saves the data in sessionStorage  data already string
    })
    .catch(error => console.error('Error fetching Student Name:', error))

  },[])

    return (
        <div className="flex">
        <Sidebar role={"student"} />
        <main className="flex-1 p-4 bg-gray-50">
          <DashboardHeader user={`Student ${userName}`} />
          <Outlet/>
        </main>
      </div>
    )

}

export default StudentDashboard