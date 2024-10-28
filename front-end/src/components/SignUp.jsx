import React, { useState } from 'react'
import SignUpCards from './subcomponents/SignUpCards'
import { SignUpProvider } from '../contexts/SignUpContext'
import SignUpForm from './subcomponents/SignUpForm'

function SignUp() {
    const [isStudent,setisStudent]=useState(false)
    const [isTeacher,setisTeacher]=useState(false)

    const setTeacher=(teacher_signup)=>{
        if(teacher_signup) setisTeacher(true)
    }
    const setStudent=(student_signup)=>{
        if(student_signup) setisStudent(true)
    }
    const renderForm= () =>{
        if (!isStudent && !isTeacher){
            return <SignUpCards />;
        } else if (isStudent) {
            return <SignUpForm role={'student'}/>;
        } else {
            return <SignUpForm role={'teacher'}/>;
        }
    }
    
    return (
        <>
            <SignUpProvider value={{setTeacher,setStudent}}>
            {renderForm()}
            </SignUpProvider>
        </>
       
    )
}

export default SignUp
