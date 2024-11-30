import React from 'react'
import ProfileDropdown from './ProfileDropdown';

function DashboardHeader ({ user }) {
    return (
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h2 className="text-xl text-gray-700">Hey {user} </h2>
        <ProfileDropdown />
      </header>
    );
  };

export default DashboardHeader
