import React, { useState, useEffect, useRef } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Import notification icon from Material-UI
import Avatar from '@mui/icons-material/AccountCircle'; // Profile icon

function ProfileDropdown() {
    const [notificationCount, setNotificationCount] = useState(0); // State to track notifications
    const [notifications, setNotifications] = useState([]); // State to track notifications
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to track dropdown visibility
    const dropdownRef = useRef(null); // Ref for dropdown

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
        if (!dropdownOpen) {
            // Reset notification count when dropdown is opened
            setNotificationCount(0);
        }
    };

    // Example function to simulate adding a notification
    const addNotification = () => {
        setNotificationCount(notificationCount + 1);
        setNotifications(prev => [...prev, `New notification ${prev.length + 1}`]);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative flex items-center space-x-4" ref={dropdownRef}>
            <span className="cursor-pointer" onClick={toggleDropdown}>
                <NotificationsIcon />
                {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
                        {notificationCount}
                    </span>
                )}
            </span>

            <span className="cursor-pointer">
                <Avatar className="text-gray-500" />
            </span>

            {dropdownOpen && (
                <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <div className="p-2">
                        <h3 className="font-bold text-lg">Notifications</h3>
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <div key={index} className="py-1 px-2 text-sm text-gray-700">
                                    {notification}
                                </div>
                            ))
                        ) : (
                            <div className="py-1 px-2 text-sm text-gray-700">No notifications</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
