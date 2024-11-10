import { useState, useEffect } from 'react';
import FailedAlert from './subcomponents/FailedAlert';
import SuccessAlert from './subcomponents/SuccessAlert';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile-info');
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
    gender: 'Male',
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const navigation = [
    { to: '#profile-info', name: 'Profile Information' },
    { to: '#change-password', name: 'Change Password' },
  ];

  // Handle password change
  const handlePasswordChange = async () => {
    if (passwords.newPassword !== passwords.confirmNewPassword && passwords.newPassword.length > 0) {
      setAlert({ type: "error", message: "New passwords don't match" });
    } else {
      try {
        const response = await fetch('/api/change-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
          }),
        });
        const result = await response.json();
        if (response.ok) {
          setAlert({ type: 'success', message: 'Password changed successfully' });
        } else {
          setAlert({ type: 'error', message: 'Error changing password' });
        }
      } catch (error) {
        setAlert({ type: 'error', message: 'Failed to change password' });
      }
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const result = await response.json();
      if (response.ok) {
        setAlert({ type: 'success', message: 'Profile updated successfully' });
      } else {
        setAlert({ type: 'error', message: result.message || 'Error updating profile' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to update profile' });
    }
  };

  // Timeout logic for alert removal
  useEffect(() => {
    if (alert.type) {
      const timeout = setTimeout(() => {
        setAlert({ type: '', message: '' });
      }, 2000); // Alert will disappear after 5 seconds

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount or alert change
    }
  }, [alert]);

  const RenderProfile = () => (
    <div className="mt-6 md:mt-4 p-6 bg-blue-50 rounded-lg shadow-md">
      <h4 className="text-2xl font-semibold text-gray-700 mb-4">Profile Information</h4>
      <form onSubmit={handleProfileSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              type="tel"
              value={profile.phoneNumber}
              onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <div className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600">{profile.email}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Gender</label>
            <div className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600">{profile.gender}</div>
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 mt-4"
        >
          Save Profile
        </button>
      </form>
    </div>
  );

  const RenderPasswordChange = () => (
    <div className="mt-6 md:mt-4 p-6 bg-blue-50 rounded-lg shadow-md">
      <h4 className="text-2xl font-semibold text-gray-700 mb-4">Change Password</h4>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">Old Password</label>
          <input
            type="password"
            value={passwords.oldPassword}
            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">New Password</label>
          <input
            type="password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Confirm New Password</label>
          <input
            type="password"
            value={passwords.confirmNewPassword}
            onChange={(e) => setPasswords({ ...passwords, confirmNewPassword: e.target.value })}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handlePasswordChange}
          className="px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 mt-4"
        >
          Change Password
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 mt-16">
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

      <div className="border-b border-gray-300 flex space-x-4">
        {navigation.map((item) => (
          <button
            key={item.to}
            onClick={() => setActiveSection(item.to.substring(1))}
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition duration-300 ${
              activeSection === item.to.substring(1)
                ? 'bg-gradient-to-r from-orange-700 to-orange-400 text-white border-b-2 border-orange-900 shadow-lg'
                : 'bg-transparent text-gray-600 hover:bg-blue-50'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Render Active Section */}
      {activeSection === 'profile-info' && RenderProfile()}
      {activeSection === 'change-password' && RenderPasswordChange()}
    </div>
  );
};

export default Settings;
