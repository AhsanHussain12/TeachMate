import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Card, Button } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import FailedAlert from './FailedAlert';
import SuccessAlert from './SuccessAlert';

function AdminGigCard({ gig, isAtAssigned, isAtPending ,getReload}) {
    const [list, setDisplayedList] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ type: "", message: "" });

// alert flushing
useEffect(() => {
    if (alert.type) {
      const timeout = setTimeout(() => {
        setAlert({ type: '', message: '' });
      }, 2000); // Alert will disappear after 5 seconds

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount or alert change
    }
}, [alert]);

    
// fetch teachers applied and admin for the list works properly with token
useEffect(() => {   
    const fetchData = async () => {
        try {
            const token = sessionStorage.getItem('jwtToken'); 
            console.log("AdminCard",token)
            if (isAtAssigned) {
                // get applied tutor list for this gigCard therefore pass gigId in bodys and adminId via token
                const response = await axios.get(`http://localhost:3000/api/v1/admin/get/assigned-gigs/applied-tutors/${gig.gigId}`,
                    {
                        headers:{authorization: `Bearer ${token}`}
                    }
                )
                if (response && response.status == 200){
                    console.log(response.data);
                    setLoading(false);
                    setDisplayedList(response.data)
                }
            } 
            else if (isAtPending) {
            // get tutor list for this gig card when at pending
                const response = await axios.get(`http://localhost:3000/api/v1/admin/get/pending-gigs/get/admins`,
                    {
                        headers:{authorization: `Bearer ${token}`}
                    }
                )
                if (response && response.status == 200){
                    console.log(response.data);
                    setLoading(false);
                    setDisplayedList(response.data)
                }
            }

        } catch (error) {
            alert(error.response.message)
        }
    
    }
    fetchData();
},[])


  // Toggle dropdown visibility
const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

// still to verify whether working with token or not  
const handleTutorSelect = async (tutorId,applicationStatus) => {

    try {
        if(tutorId && (applicationStatus==='approved' || applicationStatus==='rejected')){
            console.log("in post")
            const token = sessionStorage.getItem('jwtToken');
            const response = await axios.post(`http://localhost:3000/api/v1/admin/post/gig-to-tutor`,{tutorId:tutorId , status:applicationStatus , gigId:gig.gigId},{
                headers:{Authorization: `Bearer ${token}`}
            })
            //console.log(response)
            if (response && response.status == 200){
                setAlert({ type: 'success', message: response.data.message})
                getReload(prev => !prev);
            }
        }    
    }
    catch (error) {
        setAlert({ type: 'error', message: error.response.data.message  });
        console.error("Edit Profile error:", error);
    }
    finally {
        setIsDropdownOpen(false);
    }
}

  
const renderTeacherAsOptions = () => {
  console.log("In teacher", list);
  const formatDate = (dateString) => new Date(dateString).toISOString().split('T')[0];
  return (
      <ul className="w-full border rounded-lg shadow-md bg-white p-0">
      {list.map((tutor) => (
        <li key={tutor.tutorId} className="flex items-center justify-between p-1.5 border-b last:border-none hover:bg-gray-100">
          <div className="flex items-center space-x-4 w-full">
              <span className="text-gray-700 text-sm font-medium w-1/4 truncate">{tutor.tutorId}</span>
              <span className="text-gray-900 text-sm w-1/3 max-w-xs truncate">{tutor.fullName}</span>
              <span className="text-gray-600 text-sm w-1/4 truncate">{tutor.phoneNum}</span>
              <span className="text-gray-600 text-sm truncate w-1/4">{tutor.gender}</span>
              <span className="text-gray-600 text-sm truncate w-1/4 whitespace-nowrap">{formatDate(tutor.regDate)}</span>
              <div className="flex space-x-2 ml-auto">
              <button className="bg-green-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-green-600 focus:outline-none whitespace-nowrap"
              onClick={() => handleTutorSelect(tutor.tutorId,"approved")}
              >
              Approve
              </button>
              <button className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-green-600 focus:outline-none whitespace-nowrap"
              onClick={() => handleTutorSelect(tutor.tutorId,"rejected")}
              >
              Reject
              </button>
              </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
  

// Handle admin selection works correctly
const handleAdminSelect = async (adminId) => {
    console.log(adminId,gig.gigId)
    const token = sessionStorage.getItem('jwtToken');
    if(adminId && gig.gigId){
      try{
        const response = await axios.post('http://localhost:3000/api/v1/admin/post/gig-to-admin', { adminId: adminId, gigId: gig.gigId },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add your JWT token here
            },
          }
        )
        if(response && response.status == 200){
          setAlert({ type:'success', message: response.data.message })
          getReload(prev => !prev);
        }
      }
      catch(error){
          setAlert({ type: 'error', message: error.response.data.message })
      }
      finally{
        setIsDropdownOpen(false);
      }

    }

};

const renderAdminAsOptions = () => {
  console.log('renderAdminAsOptions');
  return (
    <ul className="w-full border rounded-lg shadow-md bg-white p-0">
      {list.map((admin) => (
        <li key={admin.adminId} className="flex items-center justify-between p-1.5 border-b last:border-none hover:bg-gray-100">
          <div className="flex items-center space-x-4 w-full">
            <span className="text-gray-700 text-sm font-medium w-1/4 truncate">{admin.adminId}</span>              
            <span className="text-gray-900 text-sm truncate w-1/4">{admin.fullname}</span>
            <span className="text-gray-600 text-sm truncate w-1/4">{admin.email}</span>  
            <span className="text-gray-600 text-sm truncate w-1/4">{admin.phoneNumber}</span>

            <button
              className="bg-green-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-green-600 focus:outline-none whitespace-nowrap"
              onClick={() => handleAdminSelect(admin.adminId)}
            >
              Assign Gig
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
  
  
  

  return (
    <>
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
        <Card
        className="w-100 shadow-sm border-0 position-relative"
        style={{
            overflow: isDropdownOpen ? 'visible' : 'hidden', // Let dropdown expand
            transition: 'all 0.3s ease-in-out', // Smooth transition when toggling
        }}
        >
        <Card.Body>
            <Card.Title className="fw-bold text-primary">
            {gig.gigTitle || 'Card Title'}
            </Card.Title>
            <Card.Text className="text-muted">
            {gig.details || 'This is a small description about the card.'}
            </Card.Text>
            <Card.Text className="fw-light text-secondary">{gig.gigType}</Card.Text>
            <Card.Text>
            <strong>Fee: </strong>
            {gig.expectedFee}
            </Card.Text>
            <Card.Text>
            <small className="text-muted">Created At: {gig.createdAt}</small>
            </Card.Text>

            {/* Button to toggle the dropdown */}
            {loading ? (
            <div className="text-center">
                <ClipLoader color="#3498db" loading={loading} size={20} />
            </div>
            ) : (
                <Button
                variant="primary"
                className="w-10 h-15"
                onClick={toggleDropdown}
                >
                {isDropdownOpen ? (
                    <FontAwesomeIcon icon={faChevronUp} className="text-black-600 w-3 h-3" />
                ) : (
                    <FontAwesomeIcon icon={faChevronDown} className="text-black-600 w-3 h-3" />
                )}
                </Button>
            )}

            {/* Dropdown Options */}
            {isDropdownOpen && (
            <div className="mt-2">
                {isAtAssigned && list.length > 0 && renderTeacherAsOptions()}
                {isAtPending && list.length > 0 && renderAdminAsOptions()}
            </div>
            )}
        </Card.Body>
        </Card>

    </>
  );
}

export default AdminGigCard;
