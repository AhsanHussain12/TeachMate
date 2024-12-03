import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import HomeLayout from './components/HomeLayout.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import SignUp from './components/SignUp.jsx'
import SignUpLayout from './components/SignupLayout.jsx'
import TeacherDashboard from './components/TeacherDashboard.jsx'
import StudentList from './components/StudentList.jsx'
import FindGigs from './components/FindGigs.jsx'
import AppliedGigs from './components/AppliedGigs.jsx'
import DisplayGig from './components/DisplayGig.jsx'
import HomeCard from './components/subcomponents/HomeCard.jsx'
import Settings from './components/Settings.jsx'
import StudentDashboard from './components/StudentDashboard.jsx'
import TeacherList from './components/TeacherList.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import AssignedGigs from './components/AssignedGigs.jsx'
import PendingGigs from './components/PendingGigs.jsx'
import ManageAdmins from './components/ManageAdmins.jsx'
import MyGigs from './components/MyGigs.jsx'
import PostGigs from './components/PostGigs.jsx'
import AdminHome from './components/AdminHome.jsx'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register necessary components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<HomeLayout />} >  // parent route
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact-us' element={<Contact />} />
    </Route>

    <Route path='/sign-up' element={<SignUpLayout />}>
      <Route index element={<SignUp />} />
    </Route>

    <Route path='/dashboard/teacher' element={<ProtectedRoute> <TeacherDashboard /> </ProtectedRoute>}>
      <Route path='' element={<HomeCard />} />
      <Route path='students' element={<StudentList/>} />
      <Route path='find-gigs' element={<FindGigs/>} />
      <Route path='applied-gigs' element={<AppliedGigs/>} />
      <Route path='gig-details/:gigId/:isApplied' element={<DisplayGig/>} />
      <Route path='settings' element={<Settings/>} />
    </Route>

    <Route path='/dashboard/student' element={<ProtectedRoute> <StudentDashboard/> </ProtectedRoute>}>
      <Route path='my-gigs' index element={<MyGigs />} /> {/* This makes MyGigs the default */}
      <Route path='teachers' element={<TeacherList/>} />
      <Route path='post-gig' element={<PostGigs/>} />
      <Route path='settings' element={<Settings/>} /> 
    </Route>

    <Route path='/dashboard/admin' element={<ProtectedRoute> <AdminDashboard/> </ProtectedRoute>}>
      <Route path='' element={<AdminHome/>} />
      <Route path='assigned-gigs' element={<AssignedGigs/>} />
      <Route path='pending-gigs' element={<PendingGigs/>} />
      <Route path='manage-admins' element={<ManageAdmins/>} />
    </Route>

    </>

  )
)

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
