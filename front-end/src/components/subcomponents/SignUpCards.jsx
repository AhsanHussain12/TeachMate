import { useState } from 'react';
import { useSignUpContext } from '../../contexts/SignUpContext';

export default function SignUpCards() {
    const {setTeacher,setStudent}=useSignUpContext()

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="flex space-x-4"> {/* This div wraps the cards and creates space between them */}
            {/* Student Card */}
            <div
              className="flex flex-col items-center p-10 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer w-100 hover:bg-red-100"
              onClick={(e) => { setStudent(true); }} // Logic preserved
            >
              <img
                src="/assets/student.jpg" // Ensure this path is correct
                alt="Student"
                className="h-50 mb-4"
              />
              <span className="text-lg font-semibold text-black hover:text-orange-700">
                I'm a Student
              </span>
            </div>
    
            {/* Teacher Card */}
            <div
              className="flex flex-col items-center p-10 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer w-100 hover:bg-red-100"
              onClick={() => { setTeacher(true); }} // Logic preserved
            >
              <img
                src="/assets/teacher.jpg" // Ensure this path is correct
                alt="Teacher"
                className="h-50 mb-4"
              />
              <span className="text-lg font-semibold text-black hover:text-orange-700">
                I'm a Teacher
              </span>
            </div>
          </div>
        </div>
      );
}
