import React from 'react';
import Header from './Header'
import { Outlet } from 'react-router-dom'
const SignUpLayout = (props) => {
    return (
        <>
        <Header/>
        <Outlet />
        </>
    );
};

export default SignUpLayout;
