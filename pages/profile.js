import axios from "axios";
import Head from "next/head";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import profile_picture from "../assets/img/profile.png";
import { AuthContext } from "../Authentication/auth";
import Header from "../components/Header";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { toast } from "react-toastify";

import FarmerPage from "../components/profileComp/farmer";
import TruckerPage from "../components/profileComp/trucker";
import AdminPage from "../components/profileComp/admin";
import { RequireAuth } from "../Authentication/RequireAuth";
import UserPage from "../components/profileComp/user";
import Footer from "../components/Footer";

function ProfilePage() {
  const router = useRouter();

  const { user, isLoading, logout } = useContext(AuthContext);

  // Redirect the user to the login page if they are not logged in
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!user) {
    router.push("/login");
    return null;
  }

  const handleLogout = async () => {
    router.push("/");
    await logout();
  };

  //profile picture edit
  const [showEditIcon, setShowEditIcon] = useState(false);

  const handleMouseEnter = () => {
    setShowEditIcon(true);
  };
  const handleMouseLeave = () => {
    setShowEditIcon(false);
  };

  const [profileImage, setProfileImage] = useState("");
  const handleEditProfile = () => {
    const formData = new FormData();
    formData.append("image", profileImage);

    axios.post("http://localhost:8000/...", formData, {
      headers: {
        authorization: `${localStorage.getItem("accessToken")}`,
      },
    });
  };

  return (
      <>
        <Head>
          <title>{user.name}</title>
          <meta name="description" content="Profile Page for Agro App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main className="bg-gray-100 min-h-screen">
          <div className="px-32">
            <div className="bg-gray-100 rounded-md  flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center gap-16 mt-10 pb-5 border-b border-black">
                <div className="relative inline-block">
                  <div className="relative">
                    <img
                      src={profile_picture.src}
                      alt="Profile image"
                      className={"rounded-full"}
                      style={{ filter: showEditIcon ? "blur(2px)" : "none" }}
                      width={208}
                      height={208}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                    {/* Position the edit icon at the bottom center of the image */}
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 bottom-0 transition-opacity duration-300 ${
                        showEditIcon ? "opacity-100" : "opacity-0"
                      }`}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}>
                      {/* Add a gray background to the edit icon */}
                      <div
                        className="bg-gray-500 rounded-full p-2"
                        onClick={handleEditProfile}>
                        <EditOutlinedIcon className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 h-[223px] w-[701px] flex justify-start items-center">
                  <div className="font-medium text-xl">
                    <ul className="text-left">
                      <li>Name: {user.name}</li>
                      <li>Role: {user.role}</li>
                      <li>Email: {user.email}</li>
                      <li>Location: Kathmandu</li>
                      {/* <li>Some Information</li> */}
                    </ul>
                    <button
                      onClick={handleLogout}
                      className="bg-white border-black border px-3  rounded-xl mt-5">
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              {user.role == "farmer" && <FarmerPage />}

              {user.role == "retailer/wholeseller" && <UserPage />}

              {user.role == "trucker" && <TruckerPage />}

              {user.role == "admin" && <AdminPage /> }
            </div>
          </div>
        </main>
        <Footer />
      </>
  );
}

export default ProfilePage;