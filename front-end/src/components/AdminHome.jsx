import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GigCompletionRate from './subcomponents/GigCompletionRate';
import ActiveTutors from './subcomponents/ActiveTutors';
import LineChart from './subcomponents/LinChart';
import GigActivityHeatmap from './subcomponents/GigActivityHeatmap';

const AdminDashboard = () => {
    const [data, setData] = useState({
        completedGigs: 150,
        totalGigs: 200,
        activeTutors: 30,
        totalTutors: 50,
        studentEngagement: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          engagement: [75, 80, 85, 90, 95],
        },
        gigActivity: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          activity: [12, 15, 10, 18],
        },
      });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const gigData = axios.get('/api/gigData');
//         const tutorData = axios.get('/api/tutorData');
//         const studentData = axios.get('/api/studentEngagementData');
        
//         const responses = await Promise.all([gigData, tutorData, studentData]);

//         const gigDataResponse = responses[0].data;
//         const tutorDataResponse = responses[1].data;
//         const studentDataResponse = responses[2].data;

//         setData({
//           completedGigs: gigDataResponse.completed,
//           totalGigs: gigDataResponse.total,
//           activeTutors: tutorDataResponse.active,
//           totalTutors: tutorDataResponse.total,
//           studentEngagement: studentDataResponse.engagement,
//           gigActivity: studentDataResponse.gigActivity,
//         });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

  return (
    <div className="p-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <GigCompletionRate completed={data.completedGigs} total={data.totalGigs} />
        <ActiveTutors activeTutors={data.activeTutors} totalTutors={data.totalTutors} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <LineChart data={data.studentEngagement} />
        <GigActivityHeatmap data={data.gigActivity} />
      </div>
    </div>
  );
};

export default AdminDashboard;
