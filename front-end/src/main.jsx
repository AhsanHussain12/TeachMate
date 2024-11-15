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
//import Login from './components/LoginModal.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<HomeLayout />} >  // parent route
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact-us' element={<Contact />} />
    </Route>

    <Route path='/sign-up' element={<SignUpLayout />}>
      <Route index element={<SignUp />} />
    </Route>

    <Route path='/dashboard' element={<TeacherDashboard/>}>
      <Route path='' element={<HomeCard />} />
      <Route path='students' element={<StudentList/>} />
      <Route path='find-gigs' element={<FindGigs/>} />
      <Route path='applied-gigs' element={<AppliedGigs/>} />
      <Route path='gig-details/:gigId/:isApplied' element={<DisplayGig/>} />
      <Route path='settings' element={<Settings/>} />
    </Route>
    </>

  )
)

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
