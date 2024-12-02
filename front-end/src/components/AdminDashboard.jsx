import React,{useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import DashboardHeader from './subcomponents/DashboardHeader'
import { Outlet } from 'react-router-dom'

function AdminDashboard() {
  const [admin,setAdmin] = useState({})
  
  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Get the token from local storage
    console.log("dashboard token: " + token)
    fetch(`http://localhost:3000/api/v1/admin/get/admin-info`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Adding the JWT token in Authorization header
      },
    })
    .then((res) => res.ok? res.json(): Promise.reject('Failed to fetch Name'))
    .then(data => {
      console.log(typeof data)
      setAdmin(data); // Updates the state with the fetched data
      localStorage.setItem('userName', data); // Saves the data in localStorage  data already string
    })
    .catch(error => console.error('Error fetching Admin Name:', error))

  },[])

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar role={"admin"} designation={admin.designation} /> 
            <main className="flex-1 p-6 bg-white rounded-lg shadow-lg mx-4 my-6">
              <DashboardHeader user={`Admin ${admin.fullName}`} />
              <div className="mt-6">
              <Outlet/>
              </div>
            </main>
          </div>
        )
}

export default AdminDashboard
