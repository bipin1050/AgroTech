import React from 'react'

import Image from 'next/image';
import logo from '../assets/img/logo.png';


const Login = () => {
  return (
<<<<<<< HEAD
    <div>
        <div>
            <Image src = {logo} width={100} height={96} />
        </div>
        <div>
            <h3>Uername</h3>
            <input placeholder='username' type={"name"}/>
            <h3>Password</h3>
            <input placeholder='*******' type={"password"}/>
        </div>
        <button>Sign In</button>
        <p>Don't have account,</p>
        <a href='#'>Sign Up</a>
=======
    <div className='login flex flex-col relative h-[100vh]'>
      <div className='text-center text-white h-1/3 pt-5 '>
      <Image src={logo} height={100} width={100} />
      </div>
      <div className=" px-5 py-10 bg-slate-300 mx-auto border-2 w-1/4 h-1/2 rounded-2xl">
        
        <label className="font-semibold text-sm text-gray-600 pb-1 block py-5">Username</label>
        <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
        <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
        <button type="button" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span className="inline-block mr-2">Login</span>

        </button>
        <div className='flex flex-row py-10'>
          <span>Do not have an account,</span>
          <button className='mx-3 cursor-pointer border-b-2 border-cyan-700 border-dotted'>Sign Up</button>
        </div>
      </div>
>>>>>>> Amrit
    </div>
  )
}

export default Login