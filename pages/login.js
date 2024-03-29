import React, { useState } from 'react'
import Image from 'next/image';
import logo from '../assets/img/logo1.png';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import { useAuth} from '../Authentication/auth';
import { toast } from 'react-toastify';
import Head from 'next/head';


const Login = () => {

  const auth = useAuth();
  const router = useRouter();

  // console.log(auth)
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleClearInput = () => {
    setUsername();
    setPassword();
  }

  const redirectPath = router.state?.path || "/"
  // console.log(redirectPath)

  if(auth.loggedIn){
      // return <Navigate to = {redirectPath} />
    router.push('/')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(username, password)
    axios.post("http://localhost:8000/user/login", {
            email: username,
            password: password
        }).then((res) => {
            handleClearInput();
            swal({
              title: "Logged In",
              icon: "success",
              timer: 1000
            });
            // auth.setAccessToken(res.data.jwt)
            auth.login(res.data);
            console.log(res.data)
            // console.log(auth.loggedIn, auth.role, auth.username, auth.isLoading)
            router.push('/');
            // toast.error("res.response.data.message");
        }).catch((err) => {
            console.log(err)
            toast.error(err.response?.data?.message || err.message)
        })
  }

  return (
    <div className="login flex flex-col relative h-[100vh]">
      <Head>
        <title>Login | AgroTech</title>
        <meta name="description" content="Agro tech - shop fresh here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-center text-white h-1/4 pt-5">
        <Image src={logo} height={150} width={150} />
      </div>
      <form
        onSubmit={handleSubmit}
        className=" px-5 py-10 bg-slate-300 mx-auto border-2 w-1/5 h-1/2 rounded-2xl">
        <label className="font-semibold text-sm text-gray-600 pb-1 block py-5">
          Username
        </label>
        <input
          type="text"
          onChange={handleUsername}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        />
        <label className="font-semibold text-sm text-gray-600 pb-1 block">
          Password
        </label>
        <input
          type="password"
          onChange={handlePassword}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        />
        <button
          type="submit"
          className="transition duration-200 bg-[#3E9B05] hover:bg-[#3E8B05] focus:bg-[#3E9B05] focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
          <span className="inline-block mr-2">Login</span>
        </button>
        <div className="py-10">
          <span>Do not have an account ?</span>
          <Link href="/signup">
            <span className="mx-1 cursor-pointer border-b-2 border-[#3E9B05] ">
              Sign Up
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login