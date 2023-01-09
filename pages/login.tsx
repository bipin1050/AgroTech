import React from 'react'

import Image from 'next/image';
import logo from '../assets/img/logo.png';


const Login = () => {
  return (
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
    </div>
  )
}

export default Login