import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faLaptop, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { API_NINJA_KEY } from '../../utils/KEYS';

const HomeCard = () => {
    const [user,setUser] =useState("Example")
    const [quote, setQuote] = useState({})
    // useEffect(() =>{
    //     fetch('https://api.api-ninjas.com/v1/quotes?category=education', {
    //         method: 'GET',
    //         headers: {
    //           'X-Api-Key': API_NINJA_KEY, // Replace 'apiKey' with your actual API key
    //         },
    //     })
    //     .then((res) => res.ok ? res.json(): Promise.reject('Failed to fetch quote'))
    //     .then(data => setQuote(data[0]))
    //     .catch(error => console.error('Error fetching the quote:', error))
    // },[])

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
                <p className="text-3xl font-bold">0</p>
                </div>
                <div className="text-center">
                <FontAwesomeIcon icon={faLaptop} className="w-10 h-10 mb-2 text-white" />
                <p className="opacity-75">Online Classes</p>
                <p className="text-3xl font-bold">0</p>
                </div>
                <div className="text-center">
                <FontAwesomeIcon icon={faUserFriends} className="w-10 h-10 mb-2 text-white" />
                <p className="opacity-75">Total Students</p>
                <p className="text-3xl font-bold">0</p>
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
