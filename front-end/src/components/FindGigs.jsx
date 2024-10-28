import React, { useEffect, useState } from 'react'
import GigCard from './subcomponents/GigCard';
import Fuse from 'fuse.js';


function FindGigs() {
    const [GIGs,setGIGs]=useState([
        { gigId: 1, gigTitle: "Math Tutoring for Grade 10", studentsInstitute: "Springfield High School", studentArea: "Downtown", expectedFee: 500, createdAt: "2024-10-15", details: "Looking for a tutor who can help with algebra and geometry.", gigType: "online" },
        { gigId: 2, gigTitle: "English Language Arts Tutor", studentsInstitute: "Maple Leaf Academy", studentArea: "Eastside", expectedFee: 600, createdAt: "2024-10-20", details: "Need help preparing for the upcoming exams.", gigType: "home" },
        { gigId: 3, gigTitle: "Science Tutor for Middle School", studentsInstitute: "Green Valley School", studentArea: "West End", expectedFee: 400, createdAt: "2024-10-22", details: "Help needed with biology and chemistry.", gigType: "online" },
        { gigId: 4, gigTitle: "History Tutor", studentsInstitute: "Riverside High", studentArea: "North Park", expectedFee: 550, createdAt: "2024-10-18", details: "Seeking assistance with historical analysis and essay writing.", gigType: "home" },
        { gigId: 5, gigTitle: "Computer Science Tutoring", studentsInstitute: "Tech Institute", studentArea: "Silicon Valley", expectedFee: 700, createdAt: "2024-10-21", details: "Looking for a tutor proficient in Python and web development.", gigType: "online" }
    ])
    const [search, setSearch] = useState("");
    const [displayedGIGs, setDisplayedGIGs] = useState(GIGs);

    const fuse = new Fuse(GIGs, {
        keys: ['gigTitle', 'gigType', 'studentsInstitute','expectedFee','studentArea'],  // Fields to search
        threshold: 0.3,                         // Tolerance level
    });

    useEffect(() => {
        const handler = setTimeout(() => {
          if (search.trim() === "") {
            setDisplayedGIGs(GIGs);
          } else {
            const results = fuse.search(search).map(result => result.item);
            setDisplayedGIGs(results);
          }
        }, 300);  // Debounce delay
    
        return () => clearTimeout(handler); // Clear timeout on component unmount or new search
      }, [search]);

// use this part for api call for student data
    // useEffect(() => {
    //     fetch(// api call to get available gigs)
    //    .then((res)=>res.json())
    //    .then((data)=>setGIGs(data))
    //    .catch((error)=> console.log(error))
    // },[])

    return (
<section className="mt-12 flex h-screen w-full">
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col w-full max-w-full h-full overflow-hidden">
        <h1 className="text-white text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 bg-gradient-to-r from-orange-700 to-orange-400 shadow-lg p-2 rounded">
            GIG BOARD
        </h1>

        <input
            type="text"
            placeholder="Search a GIG..."
            className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm hover:shadow-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        {/* Container for the list */}
        <div className="flex-1 overflow-hidden">
            <ul className="mt-4 space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                {displayedGIGs.map((each_gig) => (
                    <GigCard key={each_gig.gigId} gig={each_gig} isAppliedGig={false} />
                ))}
            </ul>
        </div>
    </div>
</section>

    );
    ;
    
}

export default FindGigs
