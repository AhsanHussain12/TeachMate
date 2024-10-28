import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginModal({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);
    const [payload,setpayload] = useState({})
    const navigate = useNavigate();  // used to navigate between pages using react-router-dom

    const handleSubmit = async (e) => {
        e.preventDefault();
        setpayload({ email: email, password: password });
        try {
            const response = await fetch('Target URL', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Assume {status:true/false, usertype: 'student'/'teacher'/'admin userid:id'}
            
            if (data.status) {
                if (data.usertype === 'student') {
                    localStorage.setItem('studentId', data.userId);
                    navigate(`/student-dashboard/${data.userid}`); // Redirect to student dashboard
                } else if (data.usertype === 'teacher') {
                    localStorage.setItem('teacherId', data.userId);
                    navigate(`/teacher-dashboard/${data.userid}`); // Redirect to teacher dashboard
                } else {
                    localStorage.setItem('adminId', data.userId);
                    navigate(`/admin-dashboard/${data.userid}`); // Redirect to admin dashboard
                }
            } else {
                setLoginFailed(true);
                setTimeout(() => {
                    setLoginFailed(false);
                }, 2000);  // Wait 2 seconds before hiding the error message
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <button 
                            onClick={onClose} 
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-center text-black-700">Login</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-1 font-medium text-black-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-black-700">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition duration-200 ease-in-out shadow-md transform hover:scale-105"
                                >
                                    Login
                                </button>
                            </div>
                            {loginFailed && (
                                <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded-lg text-center">
                                    Login failed. Please try again.
                                </div>
                            )}
                            <p className="text-sm text-gray-500 mt-4 text-center">
                                Forgot password?{' '}
                                {/*Need to implement the logic here for resetting the password */ }
                                <Link to="/reset-password" className="text-blue-700 hover:underline">
                                    Reset it here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default LoginModal;
