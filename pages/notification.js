import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Authentication/auth'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Notification = () => {
  
  const router = useRouter();
  
  const { user, isLoading } = useContext(AuthContext);

  // Redirect the user to the login page if they are not logged in
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!user) {
    router.push("/login");
    return null;
  }
  const [notification, setNotification] = useState();
  const [role, setRole] = useState("")

  const handleNotification = () => {
    setNotification(e.target.value)
  }

  const [myNotification, setMyNotification] = useState([]);

  useEffect(()=>{
    axios.post("http://localhost:8000/status/getNotification", {
      headers: {
        authorization: `${localStorage.getItem("accessToken")}`,
      },
    }).then((res)=>{
      setMyNotification(res.data.notification)
      console.log(res.data.notification)
    }).catch((err)=>{
      console.log(err);
    });
  },[])

  useEffect(()=>{
    axios.post("http://localhost:8000/status/updateNotificationStatus", {
      headers: {
        authorization: `${localStorage.getItem("accessToken")}`,
      },
    }).then((res)=>{
      console.log(res);
      auth.setNotificationCount(0)
    }).catch((err)=>{
      console.log(err);
    });
  }, [])

  const handleblogSubmit = (e) => {

    e.preventDefault();

    axios
      .post("http://localhost:8000/status/createNotification", {
        headers: {
          'authorization': `${localStorage.getItem("accessToken")}`,
        },
        notification : notification,
        role: role,
      })
      .then((res) => {
        console.log("notification sended")
      })
      .catch((err) => {
        // console.log(err.response?.data?.message || err.message);
        console.log(err);
      });
  };
  return (
    <div>
      <Head>
        <title>Notification | AgroTech</title>
        <meta name="description" content="Agro tech - shop fresh here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        {user.role == "admin" && (
          <div className="bg-white mx-auto rounded-xl p-10 w-1/2">
            <form
              onSubmit={handleblogSubmit}
              className="flex flex-col gap-5 items-start justify-start w-11/12">
              <div className="flex flex-col lg:flex-row w-full">
                <label className="w-1/3">Title</label>
                <input
                  type="text"
                  name="title"
                  value={notification}
                  onChange={(e) => setNotification(e.target.value)}
                  placeholder="Enter Notification"
                />
              </div>
              <select
                defaultValue={"DEFAULT"}
                className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg"
                onChange={(e) => setRole(e.target.value)}>
                <option value="DEFAULT" disabled>
                  Select Receiver
                </option>
                <option>retailer/wholeseller</option>
                <option>farmer</option>
                <option>trucker</option>
              </select>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Send Notification
              </button>
            </form>
          </div>
        )}
        {user.role !== "admin" && (
          <div className="m-5 flex justify-center">
            <div className="w-[70%] flex flex-col justify-center items-center bg-[#D9D9D9]">
              {myNotification.map((notification, idx) => {
                return (
                  <div className="w-[90%] p-[5px] m-[3px] rounded-md flex justify-center hover:bg-[#c9c9c9] cursor-pointerz">
                    <p className="">{notification.notification}</p>
                  </div>
                );
              })}
              {myNotification.length == 0 && (
                <div className="w-[90%] p-[5px] m-[3px] rounded-md flex justify-center hover:bg-[#c9c9c9] cursor-pointerz">
                  <p className="">No Notification found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Notification