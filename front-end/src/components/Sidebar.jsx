import React from 'react';
import SidebarItem from './subcomponents/SidebarItem';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';
import { studentSidebarConstants, teacherSidebarConstants } from '../utils/Constants';

function Sidebar({ role }) {
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
  }

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-orange-600">TEACHMATE</h1>
      </div>
      <nav className="mt-10 flex-1">
        <div className="w-full h-full bg-gray-100">
          {/* Home */}
          <NavLink
            to=""
            className="p-3 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <SidebarItem Icon={HomeIcon} label="Home" />
          </NavLink>

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
              <SidebarItem Icon={item.icon} label={item.label} />
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
