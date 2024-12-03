import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { adminSidebarConstants, studentSidebarConstants, teacherSidebarConstants } from '../utils/Constants';
import SidebarItem from './subcomponents/SidebarItem';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

function Sidebar({ role, designation }) {
  // Define sidebar items based on role
  let SidebarItems = [];
  console.log(role)

  if (role === "teacher") {
    SidebarItems = [
      { ...teacherSidebarConstants.findGig },
      { ...teacherSidebarConstants.appliedGig },
      { ...teacherSidebarConstants.students },
      { icon: SettingsIcon, label: "Settings", route: teacherSidebarConstants.settings.route }
    ];
    console.log(SidebarItems);

  } else if (role === "student") {
    // Placeholder for student role logic
    SidebarItems = [
      {...studentSidebarConstants.postGig},
      {...studentSidebarConstants.myGig},
      {...studentSidebarConstants.teachers},
      {icon: SettingsIcon, label: "Settings", route: studentSidebarConstants.settings.route }
    ]; 
  } if (role === "admin") {
    SidebarItems = [
      {...adminSidebarConstants.AssignedGigs},
      ...(designation === 'teamLead' ? [adminSidebarConstants.PendingGigs] : []),  // array flattened
      ...(designation === 'teamLead' ? [adminSidebarConstants.ManageAdmins] : [])
    ];
  }

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-orange-600">TEACHMATE</h1>
      </div>
      <nav className="mt-10 flex-1">
        <div className="w-full h-full bg-gray-100">
          {/* Home */}
          {role !== 'student' ?           
          <NavLink
            to=""
            className="p-3 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <SidebarItem Icon={HomeIcon} label="Home" />
          </NavLink> : null } 


          {/* Dynamically render other sidebar items */}
          {SidebarItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.route}
              className={({ isActive }) =>
                `p-3 text-sm font-medium ${
                  isActive ? "text-orange-700" : "text-gray-700"
                } hover:text-gray-900`
              }
            >
              <SidebarItem idebarItem Icon={item.icon} label={item.label} />
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
