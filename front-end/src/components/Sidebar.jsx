import React from 'react';
import SidebarItem from './subcomponents/SidebarItem';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';
import GroupIcon from '@mui/icons-material/Group';  // "users" equivalent
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';


function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-orange-600">TEACHMATE</h1>
      </div>
      <nav className="mt-10 flex-1"> {/* This ensures the nav takes the remaining height */}
        <div className="w-full h-full bg-gray-100">
          <NavLink
            to='' 
            className='p-3 text-sm font-medium text-gray-700 hover:text-gray-900'
          >
            <SidebarItem Icon={HomeIcon} label="Home" />
          </NavLink>

          <NavLink
            to='/dashboard/find-gigs'
            className={({ isActive }) => 
              `p-3 text-sm font-medium ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-gray-900`
            }
          >
            <SidebarItem Icon={SearchIcon} label="Find GIGs" />
          </NavLink>

          <NavLink
            to='/dashboard/applied-gigs'
            className={({ isActive }) => 
              `p-3 text-sm font-medium ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-gray-900`
            }
          >
            <SidebarItem Icon={AssignmentTurnedIn} label="Applied GiGs" />            
          </NavLink>

          <NavLink
            to='/dashboard/students'  
            className={({ isActive }) => 
              `p-3 text-sm font-medium ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-gray-900`
            }
          >
              <SidebarItem Icon={GroupIcon} label="My Students" />
          </NavLink>

          <NavLink
            to='/settings'
            className={({ isActive }) => 
              `p-3 text-sm font-medium ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-gray-900`
            }
          >
            <SidebarItem Icon={SettingsIcon} label="Settings" />
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;



