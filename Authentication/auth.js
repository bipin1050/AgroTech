// import axios from "axios";
// import { useRouter } from "next/router";
// import { useContext, useEffect } from "react";
// import { useState } from "react";
// import { createContext } from "react";

// const AuthContext = createContext()

// export const AuthProvider = ({children}) => {
//     const [accessToken,setAccessToken] = useState(null)
//     const [loggedIn, setLoggedIn] = useState(false)
//     const [isLoading, setIsLoading] = useState(true)
//     const [email, setEmail] = useState(null);
//     const [role, setRole] = useState(null);
//     const [name, setName] = useState(null);

//     const [notificationCount, setNotificationCount] = useState(0);

//     // console.log(loggedIn);

//     useEffect(()=>{
//         async function getProfile(){
//              try {
//                let res = await axios.post(
//                  "http://localhost:8000/user/isLogin",
//                  {
//                    headers: {
//                      authorization: `${localStorage.getItem("accessToken")}`,
//                    },
//                  }
//                );
//                if (res) {
//                 console.log(res.data)
//                  setRole(res.data.role);
//                  setName(res.data.name);
//                  setEmail(res.data.email);
//                  setIsLoading(false);
//                  setLoggedIn(true);
//                }
//              } catch {
//                 setIsLoading(false);
//              }
//         }

//         if(localStorage.getItem("accessToken")){
//            getProfile();
//         }
//     },[])


//     useEffect(()=>{
//       // setInterval(()=>{
        
//       // }, 5000)
//       axios
//         .post("http://localhost:8000/status/getNotificationCount", {
//           headers: {
//             authorization: `${localStorage.getItem("accessToken")}`,
//           },
//         })
//         .then((res) => {
//           // console.log(res.data.count)
//           setNotificationCount(res.data.count);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }, [])

//     const login = (data) => {
//         console.log(data)
//         setAccessToken(data.jwt);
//         setRole(data.role);
//         setName(data.name);
//         setEmail(data.email);
//         setLoggedIn(true);
//         localStorage.setItem("accessToken", data.jwt);
//         setIsLoading(false);
//     }

//     const router = useRouter();

//     const logout = () => {
//         setAccessToken(null);
//         setLoggedIn(false);
//         setRole(null);
//         setEmail(null);
//         localStorage.removeItem("accessToken");
//     }
//     return <AuthContext.Provider value={{isLoading, loggedIn, email, name, role, notificationCount, setNotificationCount, setLoggedIn, login, logout,setAccessToken}}> {children} </AuthContext.Provider>
// }

// export const useAuth = () => {
//     return useContext(AuthContext)
// }

// AuthContext.js

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [loggedIn, setLoggedIn] = useState(false);

  const [notificationCount, setNotificationCount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const loadUserFromLocalStorage = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        // setUser("");
        setIsLoading(false);
        return;
      }

      await axios
        .post("http://localhost:8000/user/isLogin", {
          headers: {
            authorization: `${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          localStorage.removeItem("token"); //check if this may create issue when there is issue in the backend
          setUser(null);
          setIsLoading(false);
          // router.push("/login");
        });
    };
    loadUserFromLocalStorage();
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8000/status/getNotificationCount", {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.count)
        setNotificationCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    await axios
      .post("http://localhost:8000/user/login", {
        email: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.jwt);
        console.log(res.data);
        setUser(res.data);
        router.push("/");
        setIsLoading(false);
        // swal({
        //   title: "Logged In",
        //   icon: "success",
        //   timer: 1000,
        // });
      })
      .catch((error) => {
        setIsLoading(false);
        router.push("/login");
        console.error(error);
        // toast.error(err.response?.data?.message || err.message);
      });
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, notificationCount, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
