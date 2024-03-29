import axios from "axios";
import { Router, useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [accessToken,setAccessToken] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);
    const [name, setName] = useState(null);

    const [notificationCount, setNotificationCount] = useState(0);

    // console.log(loggedIn);

    useEffect(()=>{
        async function getProfile(){
             try {
               let res = await axios.post(
                 "http://localhost:8000/user/isLogin",
                 {
                   headers: {
                     authorization: `${localStorage.getItem("accessToken")}`,
                   },
                 }
               );
               if (res) {
                console.log(res.data)
                 setRole(res.data.role);
                 setName(res.data.name);
                 setEmail(res.data.email);
                 setIsLoading(false);
                 setLoggedIn(true);
               }
             } catch {
                setIsLoading(false);
             }
        }

        if(localStorage.getItem("accessToken")){
           getProfile();
        }
    },[])


    useEffect(()=>{
      setInterval(()=>{
        axios.post("http://localhost:8000/status/getNotificationCount", {
          headers: {
            authorization: `${localStorage.getItem("accessToken")}`,
          },
        }).then((res)=>{
          // console.log(res.data.count)
          setNotificationCount(res.data.count)
        }).catch((err)=>{
          console.log(err)
        });
      }, 5000)
    }, [])

    const login = (data) => {
        console.log(data)
        setAccessToken(data.jwt);
        setRole(data.role);
        setName(data.name);
        setEmail(data.email);
        setLoggedIn(true);
        localStorage.setItem("accessToken", data.jwt);
        setIsLoading(false);
    }

    const router = useRouter();

    const logout = () => {
        setAccessToken(null);
        setLoggedIn(false);
        setRole(null);
        setEmail(null);
        localStorage.removeItem("accessToken");
    }
    return <AuthContext.Provider value={{isLoading, loggedIn, email, name, role, notificationCount, setNotificationCount, setLoggedIn, login, logout,setAccessToken}}> {children} </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}