import React, { useState, useEffect } from 'react';
import FailedAlert from './subcomponents/FailedAlert';
import SuccessAlert from './subcomponents/SuccessAlert';

function PostGigs() {
    const [gigTitle, setGigTitle] = useState("");
    const [studentsInstitute, setStudentsInstitute] = useState("");
    const [studentArea, setStudentArea] = useState("");
    const [expectedFee, setExpectedFee] = useState("");
    const [details, setDetails] = useState("");
    const [gigType, setGigType] = useState("online");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newGig = {
            gigTitle,
            studentsInstitute,
            studentArea,
            expectedFee: parseFloat(expectedFee),
            details,
            gigType,
        };

        console.log("New GIG Data:", newGig);

        // Simulate form submission success or failure
        const isSuccess = Math.random() > 0.5; // Randomly decide success or failure (replace with actual API logic)

        if (isSuccess) {
            setSuccessMessage("Gig successfully submitted!");
            setErrorMessage(""); // Clear any previous error
            // Reset form fields after successful submission
            setGigTitle("");
            setStudentsInstitute("");
            setStudentArea("");
            setExpectedFee("");
            setDetails("");
            setGigType("online");
        } else {
            setErrorMessage("Failed to submit the gig. Please try again.");
            setSuccessMessage(""); // Clear any previous success message
        }
    };

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
                setErrorMessage("");
            }, 3000); // Clear the message after 3 seconds

            return () => clearTimeout(timer); // Cleanup timeout on component unmount or re-render
        }
    }, [successMessage, errorMessage]);

    return (
        <section className="mt-12 flex h-screen w-full">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col w-full max-w-full h-full overflow-hidden">
                <h1 className="text-white text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 bg-gradient-to-r from-orange-700 to-orange-400 shadow-lg p-2 rounded">
                    ADD A NEW GIG
                </h1>

                {/* Display Success Alert */}
                {successMessage && <SuccessAlert message={successMessage} />}
                {/* Display Error Alert */}
                {errorMessage && <FailedAlert message={errorMessage} />}

                {/* Form for adding a new GIG */}
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            value={gigTitle}
                            onChange={(e) => setGigTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Institution
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Institute"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            value={studentsInstitute}
                            onChange={(e) => setStudentsInstitute(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Location"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            value={studentArea}
                            onChange={(e) => setStudentArea(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Expected Fee
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Expected Fee"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            value={expectedFee}
                            onChange={(e) => {
                                const value = e.target.value;
                                setExpectedFee(value >= 0 ? value : 0); // Prevent negative values
                            }}
                            required
                        />
                        {expectedFee < 0 && (
                            <p className="text-red-600 text-sm mt-1">
                                Fee cannot be negative.
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Details
                        </label>
                        <textarea
                            placeholder="Enter Details"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Mode
                        </label>
                        <select
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            value={gigType}
                            onChange={(e) => setGigType(e.target.value)}
                            required
                        >
                            <option value="online">Online</option>
                            <option value="home">Home</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 w-full"
                    >
                        Submit GIG
                    </button>
                </form>
            </div>
        </section>
    );
}

export default PostGigs;
