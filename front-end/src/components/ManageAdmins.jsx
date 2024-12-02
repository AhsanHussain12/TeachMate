import React, { useState } from 'react'
import AddAdminForm from './subcomponents/AddAdminForm';
import RemoveAdmin from './subcomponents/RemoveAdmin';

function ManageAdmins() {
    const [activeTab, setActiveTab] = useState('add-admin');
  return (
    <>
    
    <div className="border-b border-gray-300 flex space-x-4">
        <button
          onClick={() => setActiveTab('add-admin')}
          className={`px-4 py-2 text-sm font-medium rounded-t-md transition duration-300 ${activeTab === 'add-admin' ? 'bg-gradient-to-r from-blue-700 to-blue-400 text-white border-b-2 border-blue-900' : 'bg-transparent text-gray-600 hover:bg-blue-50'}`}
        >
          Add Admin
        </button>
        <button
          onClick={() => setActiveTab('del-admin')}
          className={`px-4 py-2 text-sm font-medium rounded-t-md transition duration-300 ${activeTab === 'admin-list' ? 'bg-gradient-to-r from-blue-700 to-blue-400 text-white border-b-2 border-blue-900' : 'bg-transparent text-gray-600 hover:bg-blue-50'}`}
        >
          Admin List
        </button>
    </div>

    {activeTab === 'add-admin' && <AddAdminForm/>}
    {activeTab === 'del-admin' && <RemoveAdmin/>}
    
    </>
  )
}

export default ManageAdmins