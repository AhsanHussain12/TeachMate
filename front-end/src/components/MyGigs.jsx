import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import axios from 'axios';


function DisplayGig({ gig, onClose }) {
    const [loading, setLoading] = useState(true);
    const [teachersAppliedOnGig, setTeachersAppliedOnGig] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    useEffect(() => {
      const fetchTeachersAppliedOnGig = async () => {
        const token = sessionStorage.getItem("jwtToken");
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/student/get/mygigs/applied-tutors/${gig.gigId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response && response.status === 200) {
            setTeachersAppliedOnGig(response.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
          alert("Unable to fetch teacher data. Please try again later.");
        } finally {
          setLoading(false); // Ensure spinner stops on both success and error
        }
      };
      fetchTeachersAppliedOnGig();
    }, [gig]);
  
    // Toggle dropdown visibility
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    // Render the list of applied teachers here with logic to differentiate is the gig was closed and with what teacher and if not then show all pending and rejected teachers
    const renderAppliedTeacherList = () => {
        // Filter the list based on gig status
        const displayedTutors =
          gig.status === "closed"
            ? teachersAppliedOnGig.filter(
                (teacher) => teacher.applicationStatus === "approved"
              )
            : teachersAppliedOnGig;
      
        return (
          <ol className="list-none pl-0 mt-3">
            {displayedTutors.map((teacher) => {
              // Determine the color based on the application status
              const statusColor =
                teacher.applicationStatus === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : teacher.applicationStatus === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700";
      
              return (
                <li
                  key={teacher.tutorId}
                  className="p-3 mb-2 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 flex justify-between items-center"
                >
                    <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Tutor-ID : {teacher.tutorId}</span>
                    <p className="font-medium text-gray-800 ml-2"> {teacher.fullName}</p>
                    </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}
                  >
                    {teacher.applicationStatus}
                  </span>
                </li>
              );
            })}
          </ol>
        );
      };
      
  
    return (
      <div className="mt-4 bg-white p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-orange-700 mb-4">Gig Details</h2>
        <div className="space-y-4">
          <div>
            <strong>Student Name:</strong> <span>{gig.fullName}</span>
          </div>
          <div>
            <strong>Gig Title:</strong> <span>{gig.gigTitle}</span>
          </div>
          <div>
            <strong>Student's Institute:</strong> <span>{gig.studentsInstitute}</span>
          </div>
          <div>
            <strong>Area:</strong> <span>{gig.studentArea}</span>
          </div>
          <div>
            <strong>Expected Fee:</strong> <span>${gig.expectedFee}</span>
          </div>
          <div>
            <strong>Created At:</strong>{" "}
            <span>
              {new Date(gig.createdAt).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
          <div>
            <strong>Status:</strong> <span>{gig.status}</span>
          </div>
          <div>
            <strong>Details:</strong> <span>{gig.details}</span>
          </div>
        </div>
  
        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center mt-4">
            <ClipLoader color="#3498db" loading={loading} size={30} />
          </div>
        ) : (
          <>
            {/* Dropdown Button */}
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center px-4 py-2 mt-4 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none"
            >
              {isDropdownOpen ? "Hide Applications" : "View Applications"}
              <FontAwesomeIcon
                icon={isDropdownOpen ? faChevronUp : faChevronDown}
                className="ml-2"
              />
            </button>
  
            {/* Dropdown Content */}
            {isDropdownOpen &&
              (teachersAppliedOnGig.length > 0 ? (
                renderAppliedTeacherList()
              ) : (
                <div className="mt-4 text-gray-600 italic">
                  No applications have been submitted yet. Please allow some time
                  for interested candidates to apply.
                </div>
              ))}
          </>
        )}
  
        {/* Close Button */}
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
    const [loading,setLoading] = useState(true);
    const [myGigs,setMyGigs] =useState([])
    // Dummy data for GIGs
    // const myGigs = [
    //     {
    //         gigId: 1,
    //         fullName: "Alice Johnson",
    //         gigTitle: "Advanced Algebra Tutoring",
    //         studentsInstitute: "ABC School",
    //         studentArea: "New York",
    //         expectedFee: 50,
    //         createdAt: "2024-06-14T19:00:00.000Z",
    //         status: "open", // open or closed
    //         details: "Looking for help with advanced algebra topics and problem-solving.",
    //     },
    //     {
    //         gigId: 2,
    //         studentName: "Bob Smith",
    //         gigTitle: "Middle School Science",
    //         studentsInstitute: "XYZ studentsInstitute",
    //         studentArea: "California",
    //         expectedFee: 40,
    //         createdAt: "2024-06-10T14:00:00.000Z",
    //         status: "closed",
    //         details: "Need assistance with biology and chemistry for grade 7 students.",
    //     },
    // ];


    // State for managing selected gig
    const [selectedGig, setSelectedGig] = useState(null);

    useEffect(()=>{
        const fetchStudentGigs = async()=>{
        //Fetch data from API
        const token = sessionStorage.getItem('jwtToken')
            try{
                const response = await axios.get('http://localhost:3000/api/v1/student/get/student-gigs',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if(response.status==200 && response){
                    console.log(response.data);
                    setMyGigs(response.data);                   
                }
            }
            catch(err){

            }
            finally{
            setLoading(false);
            }
    
        }
        fetchStudentGigs();
    },[])

    return (
        <section className="mt-12 flex h-screen w-full">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col w-full max-w-full h-full overflow-hidden">
                <h1 className="text-white text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6 bg-gradient-to-r from-orange-700 to-orange-400 shadow-lg p-2 rounded">
                    My GIGs
                </h1>
                {/* Conditionally Rendering of loader */}
                {loading ? (
                <div className="flex items-center justify-center h-full">
                    <ClipLoader color="#3498db" loading={loading} size={50} />
                </div>
                ) : (
                <>
                {/* Conditionally Render DisplayGig or List of Gigs */}
                {selectedGig ? (
                    <DisplayGig gig={selectedGig} onClose={() => setSelectedGig(null)}/>
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
                                        gig.status === "open"
                                            ? "bg-green-200 text-green-800"
                                            : "bg-blue-500 text-gray-800"
                                    }`}
                                >
                                    {gig.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
                </>)}
                
            </div>
        </section>
    );
}

export default MyGigs;
