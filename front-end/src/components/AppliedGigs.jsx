import React, { useEffect, useState } from 'react'
import GigCard from './subcomponents/GigCard';
import Fuse from 'fuse.js';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

// { gigId: 1, gigTitle: "Math Tutoring for Grade 10", studentArea: "Downtown", AppliedAt: "2024-10-15", gigType: "online", status: 'Pending' }, { gigId: 2, gigTitle: "Science Tutoring for Grade 11", studentArea: "Uptown", AppliedAt: "2024-10-16", gigType: "offline", status: 'Approved' }, { gigId: 3, gigTitle: "English Language Tutoring", studentArea: "Midtown", AppliedAt: "2024-10-17", gigType: "online", status: 'Rejected' }, { gigId: 4, gigTitle: "History Tutoring for Grade 12", studentArea: "Eastside", AppliedAt: "2024-10-18", gigType: "online", status: 'Pending' }, { gigId: 5, gigTitle: "Physics Tutoring for Grade 10", studentArea: "Westside", AppliedAt: "2024-10-19", gigType: "offline", status: 'Approved' }

function AppliedGigs() {
    const [appliedGigs,setAppliedGigs] = useState([])
    const [search, setSearch] = useState("");
    const [displayedGIGs, setDisplayedGIGs] = useState(appliedGigs);
    const [loading, setLoading] = useState(true);


    const fuse = new Fuse(appliedGigs, {
        keys: ['gigTitle', 'gigType', 'AppliedAt','studentArea','status'],  // Fields to search
        threshold: 0.3,                         // Tolerance level
    });

    useEffect(() => {
        const handler = setTimeout(() => {
          if (search.trim() === "") {
            setDisplayedGIGs(appliedGigs);
          } else {
            const results = fuse.search(search).map(result => result.item);
            setDisplayedGIGs(results);
          }
        }, 300);  // Debounce delay
    
        return () => clearTimeout(handler); // Clear timeout on component unmount or new search
      }, [search,appliedGigs]);


      useEffect(() => {
        const fetchData = async () => {
            const url = 'http://localhost:3000/api/v1/teacher/get/applied-gigs'; // Replace with your API endpoint
            const token = 'your-jwt-token'; // Replace with your actual JWT token
        
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adding the JWT token in Authorization header
                    },
                });
                console.log(response.data);
                setAppliedGigs(response.data);
            } 
            catch (error) {
                console.error('Error fetching data:', error.response?.data || error.message);
                alert('Error fetching data:', error.response);
            }
            finally {
                setLoading(false); // Hide loading spinner when data is fetched or fetched fails
            }
        };
        fetchData(); 
    },[])


    return (
        <section className="mt-12 flex h-screen w-full">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col w-full max-w-full h-full overflow-hidden">
            <h1 className="text-white text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 bg-gradient-to-r from-orange-700 to-orange-400 shadow-lg p-2 rounded">
               GIG BOARD
            </h1>
            {loading ? (
                <div className="flex items-center justify-center h-full">
                    <ClipLoader color="#3498db" loading={loading} size={50} />
                </div>
            ) : (
                <>
                <input
                    type="text"
                    placeholder="Search a GIG..."
                    className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm hover:shadow-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
    
                {/* Container for the list with dynamic height */}
                <div className="flex-1 overflow-hidden">
                    <ul className="mt-4 space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                        {displayedGIGs.map((each_gig) => (
                            <GigCard key={each_gig.gigId} gig={each_gig} isAppliedGig={true} />
                        ))}
                    </ul>
                </div>
                </>
            )}
            </div>
        </section>
    );
    ;
    
}

export default AppliedGigs
