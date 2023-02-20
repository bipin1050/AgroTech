import React, { useState } from 'react'

import Image from 'next/image';
import logo from '../assets/img/logo.png';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';

import swal from 'sweetalert';

const Signup = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [role, setRole] = useState();


  const router = useRouter();

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(name, email, password, role)
    if (password === confirmPassword) {
        if (password.length < 8) {
            // toast("Password too short !")\
            console.log("Short Password")
        }
        else {
            axios.post("http://localhost:8000/user/signup", {
                name: name,
                email: email,
                password: password,
                role: role
            }).then((res) => {
                swal({
                    title: "User created successfully",
                    icon: "success",
                    timer: 2000
                });
                console.log("user Created")
                router.push("/login")
                // toast.error(err.response?.data?.message || err.message)
            }).catch((err) => {
                // toast.error(err.response?.data?.message || err.message)
                console.log(err.response)
            })
        }
        // toast.error(err.response?.data?.message || err.message)
    }
    else {
        // toast("Password doesn't match")
        console.log("Password doesn't match");
    }

}
// const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('first')
// }

  return (
    <div className='login flex flex-col relative h-[100vh]'>
      <div className='text-center text-white h-1/3 pt-5 '>
      <Image src={logo} height={100} width={100} />
      </div>
      <form onSubmit={handleSubmit} className=" px-5 py-10 bg-slate-300 mx-auto border-2 w-1/4 h-1/2 rounded-2xl">
        
        <label className="font-semibold text-sm text-gray-600 pb-1 block py-5">Full Name</label>
        <input type="text" onChange={handleName} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

        <label className="font-semibold text-sm text-gray-600 pb-1 block py-5">Email</label>
        <input type="email" onChange={handleEmail} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
       
        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
        <input type="password" onChange={handlePassword} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
        
        <label className="font-semibold text-sm text-gray-600 pb-1 block"> Confirm Password</label>
        <input type="password" onChange={handleConfirmPassword} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

        <label className="font-semibold text-sm text-gray-600 pb-1 block"> Select Your Role </label>
        {/* <input type="password" onChange={handleConfirmPassword} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" /> */}
        <select
          // id="defValue"
          onChange={(e) => setRole(e.target.value)}
          defaultValue={"DEFAULT"}
          className="  border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        >
          <option value="DEFAULT" disabled >
            Select Role
          </option>
          <option>retailer</option>
          <option>farmer</option>
        </select>
        
        <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span className="inline-block mr-2">Signup</span>
        </button>


        <div className='flex flex-row py-10'>
          <span>Already have an account,</span>
          <Link href='/login' className='mx-3 cursor-pointer border-b-2 border-cyan-700 border-dotted'>Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Signup