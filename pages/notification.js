import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Authentication/auth'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Notification = () => {
  
  const auth = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!auth.loggedIn) {
      router.push("/login");
    }
  }, []);

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
      console.log(res.data.notification[0])
    }).catch((err)=>{
      console.log(err);
    });
  },[])

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
      <Header />
      <div>
        {auth.role == "admin" && (
          <div className="bg-white flex  flex-col w-1/2 rounded-xl p-10 justify-center py-10">
            <form
              onSubmit={handleblogSubmit}
              className="flex flex-col gap-5 justify-start items-start w-11/12">
              <div className="flex flex-col lg:flex-row  w-full">
                <label className="w-1/3">Title</label>
                <input
                  placeholder="Enter Notification"
                  type="text"
                  value={notification}
                  // onChange={handleNotification}
                  onChange={(e) => setNotification(e.target.value)}
                  name="title"
                />
              </div>
              <select
                // id="defValue"
                onChange={(e) => setRole(e.target.value)}
                defaultValue={"DEFAULT"}
                className="  border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full">
                <option value="DEFAULT" disabled>
                  Select Receiver
                </option>
                <option>retailer/wholeseller</option>
                <option>farmer</option>
              </select>
              <button type="submit">Send Notification</button>
            </form>
          </div>
        )}
        {/* {auth.role !== 'admin' && (
          <div>
            {myNotification.map((notification, idx) => {
                <p>{notification.notification}</p>
                {console.log(notification.notification)}
            })} 
          </div>
        )} */}
        <div>
          {myNotification.map((notification, idx) => {
            return (
              <p>{notification.notification}</p>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Notification