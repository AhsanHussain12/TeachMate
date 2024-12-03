import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
import SuccessAlert from './SuccessAlert';
import FailedAlert from './FailedAlert';

const AddAdminForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    if (alert.type) {
      const timeout = setTimeout(() => {
        setAlert({ type: '', message: '' });
      }, 2000); // Alert will disappear after 5 seconds

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount or alert change
    }
  }, [alert]);

  // Form submission handler
  const onSubmit = async (payload) => {
    const token = sessionStorage.getItem('jwtToken');
    console.log(payload);
    try {
        const response = await axios.post(`http://localhost:3000/api/v1/admin/add/admin`, payload,  
        {
            headers: {
                Authorization: `Bearer ${token}`, // Bearer token for authorization
            },
        }
        )
        if (response && response.status === 200) {
            setAlert({ type: 'success', message: response.data.message });
            reset();
        }
    } catch (error) {
        setAlert({ type: 'error', message: error.response.data.message });
        console.error('Error removing admin:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
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
      <h2 className="text-2xl font-semibold mb-4">Add New Admin</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              {...register('fullName', { required: 'Full Name is required' })}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
            />
            {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required', 
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email address',
                },
              })}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              {...register('password', { 
                required: 'Password is required', 
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              type="text"
              {...register('phoneNumber', { 
                required: 'Phone Number is required',
                pattern: {
                  value: /^0\d{10}$/,
                  message: 'Phone number must be 11 digits long and start with 0',
                },
              })}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
            />
            {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Designation</label>
            <select
              {...register('designation', { required: 'Designation is required' })}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Designation</option>
              <option value="teamLead">Team Lead</option>
              <option value="member">Member</option>
            </select>
            {errors.designation && <span className="text-red-500 text-sm">{errors.designation.message}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Add Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminForm;
