import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FailedAlert from '../components/subcomponents/FailedAlert';
import SuccessAlert from '../components/subcomponents/SuccessAlert';  
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
function DisplayGig () {
    const {gigId,isApplied} = useParams()
    const [loadingBtn,setLoadingBtn] = useState(false)
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [gig,setGig]=useState({})
    const navigate = useNavigate()
// Timeout logic for alert removal
  useEffect(() => {
    if (alert.type) {
      const timeout = setTimeout(() => {
        setAlert({ type: '', message: '' });
      }, 2000); // Alert will disappear after 5 seconds

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount or alert change
    }
  }, [alert]);

// use this part for api call for student data
    useEffect(()=>{
        const fetchData = async ()=>{
        const url = `http://localhost:3000/api/v1/gig/get-details/${gigId}`; // Replace with your API endpoint
        const token = 'your-jwt-token'; // Replace with your actual JWT token
        try {
        const response = await axios.get(url,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log(response.data)
        setGig(response.data) 
        } 
        catch (error) {
            console.error('Error fetching data:', error.response?.data || error.message);
            setAlert({ type: 'error', message: 'Error fetching data' });
        }

        }
        fetchData()
    },[])

    const handleSubmit = async () => {
        setLoadingBtn(true);
         // Replace with your actual JWT token
        try {
          const url = `http://localhost:3000/api/v1/teacher/post/apply-to-gig/${gigId}`;
          const token = localStorage.getItem('jwtToken');
          console.log(token);
          const response = await axios.post(url,{},{
            headers: {
                authorization: `Bearer ${token}`, // Adding the JWT token in Authorization header
            },
          });
      
          console.log(response);
      
          if (response && response.status === 200) {
            setAlert({ type: 'success', message: response.data.message });
            setTimeout(() =>{
                navigate('/dashboard/teacher/find-gigs')
            },[1000])
          } else {
            setAlert({ type: 'error', message: 'Unexpected response from server' });
          }
        } catch (error) {
          // Check if error.response exists before accessing error.response.status
          if (error.response) {
            if (error.response.status === 400) {
              setAlert({ type: 'error', message: error.response.data.message }); // Message from server
            } else {
              setAlert({ type: 'error', message: `Error: ${error.response.status} ${error.response.message}` });
            }
          } 
          else if (error.request) {
            // Handle the case where no response was received (e.g., network error)
            setAlert({ type: 'error', message: 'Network Error. Please try again later.' });
          } 
          else {
            // Catch any other errors, like configuration issues
            setAlert({ type: 'error', message: `Error: ${error.message}` });
          }
          console.error("Apply to Gig error:", error);
        } finally {
          setLoadingBtn(false); // Ensure loading indicator is stopped regardless of success or error
        }
      };


    return (
        <section className="mt-10 flex h-screen w-full">
            {/* Render Alert with Timeout */}
            {alert.type && (
                <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
                {alert.type === 'success' ? (
                    <SuccessAlert message={alert.message} />
                ) : (
                    <FailedAlert message={alert.message} />
                )}
                </div>
            )}
            <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 flex flex-col w-full max-w-full h-full">
                <h1 className="text-white text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-5 bg-gradient-to-r from-orange-700 to-orange-400 shadow-lg p-2 rounded">
                    GIG DETAILS 
                </h1>
                
                <div className="flex flex-col space-y-3">
                    <label className="flex flex-col text-gray-800 font-medium">
                        Student Name:
                        <input
                            type="text"
                            value={gig.fullName}
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
                {isApplied === 'false' ? (
                <div className="mt-5 flex justify-center">
                    <button
                    className={`py-2 px-6 bg-orange-700 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-300 ${
                        loadingBtn ? 'pointer-events-none opacity-50' : ''
                    }`}
                    onClick={handleSubmit}
                    disabled={loadingBtn}
                    >
                    {loadingBtn ? (
                        <div className="flex items-center justify-center">
                        <ClipLoader color="#3498db" loading={loadingBtn} size={24} />
                        </div>
                    ) : (
                        'Apply for a Demo'
                    )}
                    </button>
                </div>
                ) : null}

            </div>
        </section>
    );
}

export default DisplayGig;
