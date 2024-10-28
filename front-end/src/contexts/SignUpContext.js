import { useContext,createContext } from "react";

export const SignUpContext= createContext({
    setTeacher: () => {},
    setStudent: () => {},
})

export const SignUpProvider = SignUpContext.Provider

export const useSignUpContext = () =>{
    return  useContext(SignUpContext);
}