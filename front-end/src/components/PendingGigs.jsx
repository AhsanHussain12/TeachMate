import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import axios from 'axios';
import AdminGigCard from './subcomponents/AdminGigCard';
import { ClipLoader } from 'react-spinners';

 // will show gigs that donot have any admin assigned to them with list of admins each with an assign button 
function PendingGigs() {
    const [pendingGigs, setpendingGigs] = useState([])
    const [search, setSearch] = useState("");
    const [displayedGIGs, setDisplayedGIGs] = useState(pendingGigs);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);

    
const fuse = new Fuse(pendingGigs, {
    keys: ['gigTitle', 'gigType', 'studentsInstitute','expectedFee','studentArea','status'],  // Fields to search
    threshold: 0.3,                         // Tolerance level
});

useEffect(() => {
    const handler = setTimeout(() => {
      if (search.trim() === "") {
        setDisplayedGIGs(pendingGigs);
      } else {
        const results = fuse.search(search).map(result => result.item);
        setDisplayedGIGs(results);
      }
    }, 300);  // Debounce delay

    return () => clearTimeout(handler); // Clear timeout on component unmount or new search
}, [search,pendingGigs]);


useEffect(() => {
  const fetchData = async () => {
    const url = 'http://localhost:3000/api/v1/admin/get/pending-gigs'; 
    const token = sessionStorage.getItem('jwtToken');  

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
      console.log(response.data);
      setpendingGigs(response.data); 
    } catch (error) {

      if (error.response) {
        console.error('Error fetching data:', error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } 
      else if (error.request) {
        // No response received from the server
        console.error('Error with request:', error.request);
        alert('No response from server. Please try again later.');
      } 
      else {
        // Something went wrong in setting up the request
        console.error('Error setting up request:', error.message);
        alert('An error occurred while setting up the request.');
      }
    } finally {
      setLoading(false); // Hide loading spinner after data is fetched (or error occurs)
    }
  };

  fetchData(); // Call fetchData function inside useEffect
}, [reload]);


    return (
        <section className="mt-12 flex h-screen w-full">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col w-full max-w-full h-full overflow-hidden">
            <h1 className="text-white text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 bg-gradient-to-r from-orange-700 to-orange-400 shadow-lg p-2 rounded">
               pending GIGs
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
                            <AdminGigCard key={each_gig.gigId} gig={each_gig} isAtPending={true} getReload={setReload}/>
                        ))}
                    </ul>
                </div>
                </>
            )}
            </div>
        </section>
    );
}

export default PendingGigs