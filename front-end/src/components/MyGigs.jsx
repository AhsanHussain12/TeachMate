import React, { useState } from "react";

function DisplayGig({ gig, onClose }) {
    return (
        <div className="mt-4 bg-white p-6 shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">GIG DETAILS</h2>
            <div className="space-y-4">
                <div>
                    <strong>Student Name:</strong> <span>{gig.studentName}</span>
                </div>
                <div>
                    <strong>Gig Title:</strong> <span>{gig.gigTitle}</span>
                </div>
                <div>
                    <strong>Institute:</strong> <span>{gig.institute}</span>
                </div>
                <div>
                    <strong>Area:</strong> <span>{gig.area}</span>
                </div>
                <div>
                    <strong>Expected Fee:</strong> <span>${gig.expectedFee}</span>
                </div>
                <div>
                    <strong>Created At:</strong> <span>{gig.createdAt}</span>
                </div>
                <div>
                    <strong>Status:</strong> <span>{gig.gigStatus}</span>
                </div>
                <div>
                    <strong>Details:</strong> <span>{gig.details}</span>
                </div>
            </div>
            <button
                onClick={onClose}
                className="mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700"
            >
                Close
            </button>
        </div>
    );
}

function MyGigs() {
    // Dummy data for GIGs
    const myGigs = [
        {
            gigId: 1,
            studentName: "Alice Johnson",
            gigTitle: "Advanced Algebra Tutoring",
            institute: "ABC School",
            area: "New York",
            expectedFee: 50,
            createdAt: "2024-06-14T19:00:00.000Z",
            gigStatus: "open", // open or closed
            details: "Looking for help with advanced algebra topics and problem-solving.",
        },
        {
            gigId: 2,
            studentName: "Bob Smith",
            gigTitle: "Middle School Science",
            institute: "XYZ Institute",
            area: "California",
            expectedFee: 40,
            createdAt: "2024-06-10T14:00:00.000Z",
            gigStatus: "closed",
            details: "Need assistance with biology and chemistry for grade 7 students.",
        },
    ];

    // State for managing selected gig
    const [selectedGig, setSelectedGig] = useState(null);

    return (
        <section className="mt-12 flex h-screen w-full">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col w-full max-w-full h-full overflow-hidden">
                <h1 className="text-white text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 bg-gradient-to-r from-orange-700 to-orange-400 shadow-lg p-2 rounded">
                    My GIGs
                </h1>

                {/* Conditionally Render DisplayGig or List of Gigs */}
                {selectedGig ? (
                    <DisplayGig gig={selectedGig} onClose={() => setSelectedGig(null)} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {myGigs.map((gig) => (
                            <div
                                key={gig.gigId}
                                onClick={() => setSelectedGig(gig)}
                                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                            >
                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    {gig.gigTitle}
                                </h3>
                                <p className="text-gray-600 mb-2">
                                    {gig.details.substring(0, 50)}...
                                </p>
                                <p className="text-sm text-gray-500">
                                    Created At: {gig.createdAt}
                                </p>
                                <span
                                    className={`inline-block px-3 py-1 text-sm rounded-full ${
                                        gig.gigStatus === "open"
                                            ? "bg-green-200 text-green-800"
                                            : "bg-red-200 text-red-800"
                                    }`}
                                >
                                    {gig.gigStatus}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default MyGigs;
