import React from 'react'
import Sidebar from './Sidebar'
import DashboardHeader from './subcomponents/DashboardHeader'
import { Outlet } from 'react-router-dom'

function StudentDashboard() {
    return (
        <div className="flex">
        <Sidebar role={"student"} />
        <main className="flex-1 p-4 bg-gray-50">
          <DashboardHeader user="Ashhad Hassan Siddiqui" />
          <Outlet/>
        </main>
      </div>
    )

}

export default StudentDashboard