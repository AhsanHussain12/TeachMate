import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from './Sidebar'
import DashboardHeader from './subcomponents/DashboardHeader'
import StatsCardList from './StatsCardList'
import { Outlet } from 'react-router-dom'

function TeacherDashboard(props) {
    const {} = props

    return (
        <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-50">
          <DashboardHeader user="Ashhad Hassan Siddiqui" />
          <Outlet/>
          {/* <StatsCardList />
          <StudentList /> */}
        </main>
      </div>
    )
}

export default TeacherDashboard

