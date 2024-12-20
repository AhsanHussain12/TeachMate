import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import DashboardHeader from './subcomponents/DashboardHeader'
import { Outlet } from 'react-router-dom'
import { API_NINJA_KEY } from '../utils/KEYS';


function TeacherDashboard() {
  const [userName, setUsername] = useState(null)
  const token = sessionStorage.getItem('jwtToken'); // Get the token from local storage
  useEffect(() => {
    
    // gets the quote from api and parses and store in local storage to avoid repetative api calls
    fetch('https://api.api-ninjas.com/v1/quotes?category=education', {
      method: 'GET',
      headers: {
        'X-Api-Key': API_NINJA_KEY, // Replace 'apiKey' with your actual API key
      },
    })
    .then((res) => res.ok ? res.json(): Promise.reject('Failed to fetch quote'))
    .then(data => sessionStorage.setItem('quote',JSON.stringify(data[0])))
    .catch(error => console.error('Error fetching the quote:', error))


    // get teacher name on opening dashboard and stores to sessionStorage in string already therefore no need to stringify
    fetch(`http://localhost:3000/api/v1/teacher/get/teacher-name`, {
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
    .catch(error => console.error('Error fetching Teacher Name:', error))

  },[])

  return (
    <div className="flex min-h-screen bg-gray-50">
        <Sidebar role={"teacher"} />
        <main className="flex-1 p-6 bg-white rounded-lg shadow-lg mx-4 my-6">
          <DashboardHeader user={`Tutor ${userName}`} />
          <div className="mt-6">
          <Outlet/>
          </div>
        </main>
      </div>
    )
}

export default TeacherDashboard

