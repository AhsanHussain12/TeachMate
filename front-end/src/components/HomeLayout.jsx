import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function HomeLayout(props) {
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>        
    )
}

export default HomeLayout;

/*

the Outlet component from react-router-dom is a placeholder that renders the child route components.
"/ " will render the Layout component, and inside that, the Home component will be rendered where the <Outlet /> is placed.
"/about" will render the Layout component, but this time the About component will be rendered inside the <Outlet />.
So, Outlet serves as a way to dynamically render child routes within a parent route 

*/