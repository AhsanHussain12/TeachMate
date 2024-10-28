import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DisplayGig () {
    const{gigId,isApplied}=useParams()

    // const [gig,setGig]=useState({})
    const gig = {
        studentName: "John Doe",
        gigTitle: "Mathematics Tutoring",
        studentsInstitute: "ABC University",
        studentArea: "Karachi",
        expectedFee: "$50/hour",
        createdAt: "2024-10-27",
        details: "Looking for a tutor to help with calculus and algebra.",
        gigType: "Tutoring"
    };

// use this part for api call for student data
  // useEffect(()=>{
  //   fetch()
  //   .then((res)=>res.json())
  //   .then((data)=>setGig(data))
  //   .catch((error)=> console.log(error))
  // },[])

  const handleSubmit = () => {
    const teacherId = Number(localStorage.getItem('teacherId')) || null;
    const payload = {
        tutorId: teacherId,
        ADId: gigId,
        Date: new Date(),
        applicationStatus: 'pending'
    };

    if (teacherId) {
        fetch('YOUR_API_ENDPOINT_HERE', {
            method: 'POST', // or 'PUT' based on your API
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            console.log('Success:', data);
            // Handle successful response here, e.g., redirect or show a message
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error here, e.g., show an error message to the user
        });
    } else {
        console.error('No teacher ID found in localStorage');
        // Handle the case where teacherId is null (not logged in)
    }
};


    return (
        <section className="mt-10 flex h-screen w-full">
            <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 flex flex-col w-full max-w-full h-full">
                <h1 className="text-white text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-5 bg-gradient-to-r from-orange-700 to-orange-400 shadow-lg p-2 rounded">
                    GIG DETAILS  {isApplied}
                </h1>
                
                <div className="flex flex-col space-y-3">
                    <label className="flex flex-col text-gray-800 font-medium">
                        Student Name:
                        <input
                            type="text"
                            value={gig.studentName}
                            readOnly
                            className="border border-gray-200 rounded-lg p-2 bg-gray-100 text-gray-600"
                        />
                    </label>

                    <label className="flex flex-col text-gray-800 font-medium">
                        Gig Title:
                        <input
                            type="text"
                            value={gig.gigTitle}
                            readOnly
                            className="border border-gray-200 rounded-lg p-2 bg-gray-100 text-gray-600"
                        />
                    </label>

                    <label className="flex flex-col text-gray-800 font-medium">
                        Institute:
                        <input
                            type="text"
                            value={gig.studentsInstitute}
                            readOnly
                            className="border border-gray-200 rounded-lg p-2 bg-gray-100 text-gray-600"
                        />
                    </label>

                    <label className="flex flex-col text-gray-800 font-medium">
                        Area:
                        <input
                            type="text"
                            value={gig.studentArea}
                            readOnly
                            className="border border-gray-200 rounded-lg p-2 bg-gray-100 text-gray-600"
                        />
                    </label>

                    <label className="flex flex-col text-gray-800 font-medium">
                        Expected Fee:
                        <input
                            type="text"
                            value={gig.expectedFee}
                            readOnly
                            className="border border-gray-200 rounded-lg p-2 bg-gray-100 text-gray-600"
                        />
                    </label>

                    <label className="flex flex-col text-gray-800 font-medium">
                        Created At:
                        <input
                            type="text"
                            value={gig.createdAt}
                            readOnly
                            className="border border-gray-200 rounded-lg p-2 bg-gray-100 text-gray-600"
                        />
                    </label>

                    <label className="flex flex-col text-gray-800 font-medium">
                        Gig Type:
                        <input
                            type="text"
                            value={gig.gigType}
                            readOnly
                            className="border border-gray-200 rounded-lg p-2 bg-gray-100 text-gray-600"
                        />
                    </label>

                    <label className="flex flex-col text-gray-800 font-medium">
                        Details:
                        <textarea
                            value={gig.details}
                            readOnly
                            className="border border-gray-200 rounded-lg p-2 bg-gray-100 text-gray-600 h-24 resize-none"
                        />
                    </label>
                </div>
                {isApplied==='false' ? <button 
                className="mt-5 py-2 px-4 bg-orange-700 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
                onClick={handleSubmit}
                >Apply for a Demo</button>:null }
            </div>
        </section>
    );
}

export default DisplayGig;
