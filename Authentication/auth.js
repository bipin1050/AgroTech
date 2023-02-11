import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [accessToken,setAccessToken] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);

    // useEffect(()=>{
    //     axios.post("http://localhost:5000/login/checktoken", {
    //     headers: {
    //         'authorization': `${localStorage.getItem("accessToken")}` 
    //     }
    //     })
    //     .then((res)=>{
    //         setLoggedIn(true)
    //         setIsLoading(false)
    //     })
    //     .catch((err)=>{
    //         setIsLoading(false)
    //     })
    // },[])

    const login = (data) => {
        setAccessToken(data.accessToken)
        setLoggedIn(true)
        setRole(data.Role)
        localStorage.setItem("accessToken", accessToken)
    }

    const logout = () => {
        setAccessToken(null)
        setLoggedIn(false)
        setRole(null)
        localStorage.removeItem("accessToken")
    }
    return <AuthContext.Provider value={{accessToken, isLoading, loggedIn, setLoggedIn, login, logout}}> {children} </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}