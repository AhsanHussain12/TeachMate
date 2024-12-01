import React from 'react'
import ProfileDropdown from './ProfileDropdown';
import { useNavigate } from 'react-router-dom';

function DashboardHeader ({ user }) {
  const navigate = useNavigate();
  const handleLogout = () => {  
    console.log("Logged out");
    // localStorage.removeItem('jwtToken');
    // localStorage.removeItem('userName');
    localStorage.clear();
    navigate("/");

  }
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl text-gray-800 font-semibold">Hey {user}</h2>
      <div className="flex items-center space-x-4">
        {/* Profile Dropdown */}
        <ProfileDropdown />
        
        {/* Logout Button */}
        <button 
          className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 ease-in-out"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader
