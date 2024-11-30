import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLaptop, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const HomeCard = () => {
    const [user,setUser] =useState("User")
    const [quote, setQuote] = useState({})
    const [dashboardStats, setdashboardStats] = useState({ homeCount: { count: 0 },onlineCount: { count: 0 },allstudentCount: { count: 0 } })

    useEffect(() =>{

        // fetch User Name and dashboard stats for hometutionCount, OnlinetutionCount and TotalCount

        const token = "asdasda" // localStorage.getItem('jwtToken');  Replace with actual JWT token

        fetch(`http://localhost:3000/api/v1/teacher/get/my-student-counts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Adding the JWT token in Authorization header
            },
        })
       .then((res) => res.ok ? res.json() : Promise.reject('Failed to fetch user data'))
       .then(data => {console.log(data); setdashboardStats(data)})
       .catch(error => console.error('Error fetching user data:', error))
       
       // retrieve userName from localStorage
       const storedUserName = localStorage.getItem('userName')
        if (storedUserName) {
            setUser(storedUserName);  // Set the state with the stored value
        }
        // retrieve quote from localStorage as string and the parses it into json object
        const storedQuote = localStorage.getItem('quote')
        if (storedQuote) {
            // console.log(JSON.parse(storedQuote));
            setQuote(JSON.parse(storedQuote));  // Set the state with the stored value
        }

    },[])


  return (
    <>
        <div className="p-8 max-w-full mx-auto bg-gradient-to-r from-orange-700 to-orange-400 text-white shadow-lg rounded-lg mt-16 mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6">{user}</h2>
                <h3 className="text-white opacity-75">Dashboard Home</h3>
            </div>

            <div className="flex justify-around mb-8">
                <div className="text-center">
                <FontAwesomeIcon icon={faHouse} className="w-10 h-10 mb-2 text-white" />
                <p className="opacity-75">Home Tuitions</p>
                <p className="text-3xl font-bold">{dashboardStats.homeCount.count}</p>
                </div>
                <div className="text-center">
                <FontAwesomeIcon icon={faLaptop} className="w-10 h-10 mb-2 text-white" />
                <p className="opacity-75">Online Classes</p>
                <p className="text-3xl font-bold">{dashboardStats.onlineCount.count}</p>
                </div>
                <div className="text-center">
                <FontAwesomeIcon icon={faUserFriends} className="w-10 h-10 mb-2 text-white" />
                <p className="opacity-75">Total Students</p>
                <p className="text-3xl font-bold">{dashboardStats.allstudentCount.count}</p>
                </div>
            </div>
        </div>
        <div className="mt-8 p-8 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-xl shadow-xl">
        <h4 className="text-2xl font-semibold text-white mb-4">Teacher's Quote of the Day:</h4>
        <p className="text-lg font-serif text-gray-100 italic leading-relaxed">
            "{quote.quote}" 
            <br />
            <span className="block mt-4 text-gray-200 text-sm text-right">- {quote.author}</span>
        </p>
        </div>


    
    </>

  );
};

export default HomeCard;
