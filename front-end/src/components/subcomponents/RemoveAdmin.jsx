import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import SuccessAlert from './SuccessAlert';
import FailedAlert from './FailedAlert';

function RemoveAdmin() {
  const [admins, setAdmins] = useState([{ adminId: 4944, fullName: 'asd', email: 'asd@', phoneNumber: '54646546', designation: 'asdasdasd'}]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [reload, setReload] = useState(false); // Add reload state to trigger useEffect for fetching data again
  const token = localStorage.getItem('jwtToken');

  const handleRemoveAdmin = async (id) => {

    const response = window.confirm(`Are you sure you want to remove this AdminId: ${id}?`);
        if (response) {
            try {
                const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Bearer token for authorization
                },
                };
                const response = await axios.delete(`http://localhost:3000/api/v1/admin/remove/admin/${id}`, config); // Replace with your API endpoint
                if (response && response.status === 200) {
                setAlert({ type: 'success', message: response.data.message });
                setReload(prev=> !prev)
                }
                
            } 
            catch (error) {
              setAlert({ type: 'error', message: error.response.data.message });
                console.error('Error removing admin:', error);
            }
        } 

  };

  useEffect(() => {
    if (alert.type) {
      const timeout = setTimeout(() => {
        setAlert({ type: '', message: '' });
      }, 2000); // Alert will disappear after 5 seconds

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount or alert change
    }
  }, [alert]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        // Adding the token to the request headers
        const response = await axios.get(`http://localhost:3000/api/v1/admin/get/pending-gigs/get/admins`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                },
            }
        )
        if (response && response.status == 200){
            console.log(response.data);
            setAdmins(response.data);
            setLoading(false); // Set loading to false when data is fetched
        }
        
        } catch (error) {
        toast.error('Failed to fetch admins');
        console.error('Error fetching admins:', error);
        setLoading(false); // Set loading to false even if there was an error
      }
    };

    fetchAdmins();
  }, [reload]);

  return (
    <div className="p-8">
        {/* Render Alert with Timeout */}
        {alert.type && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
            {alert.type === 'success' ? (
            <SuccessAlert message={alert.message} />
            ) : (
            <FailedAlert message={alert.message} />
            )}
        </div>
        )}
      <h2 className="text-white text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 bg-gradient-to-r from-orange-700 to-orange-400 shadow-lg p-2 rounded">Admins List</h2>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <ClipLoader color="#3498db" loading={loading} size={50} />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Admin ID</th>
                  <th className="py-3 px-6 text-left">Full Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Phone Number</th>
                  <th className="py-3 px-6 text-left">Designation</th>
                  <th className="py-3 px-6 text-left">Action</th> 
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {admins.length > 0 && admins.map((admin) => (
                  <tr key={admin.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left text-blue-500 hover:underline">{admin.adminId}</td> 
                    <td className="py-3 px-6 text-left">{admin.fullname}</td>
                    <td className="py-3 px-6 text-left">{admin.email}</td>
                    <td className="py-3 px-6 text-left">{admin.phoneNumber}</td>
                    <td className="py-3 px-6 text-left">{admin.designation}</td>
                    <td className="py-3 px-6 text-left">
                      <button
                        onClick={() => handleRemoveAdmin(admin.adminId)} // Changed to admin.id
                        className="text-sm text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                      >
                        Remove Admin
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default RemoveAdmin;
