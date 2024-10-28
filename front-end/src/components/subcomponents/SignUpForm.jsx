import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const curriculumOptions = [
    'PRIMARY CLASSES ',
    'SECONDARY CLASSES ',
    'MATRIC (IX-X)',
    'INTERMEDIATE (XI-XII)',
    'O LEVEL',
    'A LEVEL',
    'MCAT',
    'BCAT',
    'ECAT',
    'SAT',
    'IELTS',
    'CA',
    'ACCA',
    'UNIVERSITY COURSES',
    'CAREER COUNSELLING',
    'CSS EXAM PREP',
    'GRE',
    'IB',
];

const SignupForm = ({role}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [payload,setPayload] = useState({});

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const formFieldClasses =()=>{
        return (
        <>
        <div className="w-full">
        <label htmlFor="class" className="text-gray-600 font-medium">Class</label>
        <select
            id="class"
            {...register('class', { required: 'Class selection is required' })}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
        >
            <option value="">Select Class</option>
            {curriculumOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
        {errors.class && <p className="text-red-500 text-sm">{errors.class.message}</p>}
        </div>
        </>
        
        )
    }

    const onSubmit = async (data) => {
            setPayload({...data, role: role});
            console.log(data);
            try {
                const response = await fetch('https://your-api-url.com/endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const result = await response.json();
                console.log('Success:', result);
                // You can also handle success UI or state updates here
            } catch (error) {
                console.error('Error:', error);
                // Handle error UI or state updates here
            }
    };

    return (
        <div className="flex flex-wrap justify-center items-center min-h-screen bg-gray-100">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="hidden md:block w-4/5">
                <img 
                    src={role === 'student' ? '/assets/student-signup.jpg' : '/assets/teacher-signup.JPG'} 
                    alt="Sign Up" 
                    className="object-cover w-full h-full" // This ensures the image covers the container
                />
            </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-2/2 p-8 space-y-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800">Welcome To TEACHMATE</h2>
                    <p className="text-center text-gray-500">Please Signup to access your account.</p>

                    <div className="w-full">
                        <label htmlFor="username" className="text-gray-600 font-medium">Full Name</label>
                        <input
                            type="text"
                            id="username"
                            {...register('username', { required: 'Username is required' })}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            placeholder="Full name"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>

                    <div className="w-full">
                        <label htmlFor="email" className="text-gray-600 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Email is invalid',
                                },
                            })}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="w-full">
                        <label htmlFor="phone" className="text-gray-600 font-medium">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            {...register('phone', { required: 'Phone number is required', minLength: { value: 10, message: 'Phone number must be at least 10 digits' } })}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            placeholder="Phone number"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    <div className="w-full">
                        <label htmlFor="gender" className="text-gray-600 font-medium">Gender</label>
                        <select
                            id="gender"
                            {...register('gender', { required: 'Gender is required' })}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                    </div>
                    {/*Conditional rendering of classes based on role to promote component usability*/ }
                    {role === 'student' ? formFieldClasses() : null}

                    <div className="w-full relative">
                        <label htmlFor="password" className="text-gray-600 font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                })}
                                className="w-full mt-1 p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                placeholder="Type your password"
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <div className="w-full relative">
                        <label htmlFor="confirmPassword" className="text-gray-600 font-medium">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: (value) => value === watch('password') || 'Passwords do not match',
                                })}
                                className="w-full mt-1 p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                placeholder="Type your password"
                            />
                            <FontAwesomeIcon
                                icon={showConfirmPassword ? faEyeSlash : faEye}
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                            />
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" className="w-full py-3 mt-6 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-200">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;