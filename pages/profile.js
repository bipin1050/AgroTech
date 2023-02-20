import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import logo from '../assets/img/logo.png'
import { useAuth } from '../Authentication/auth';
import { RequireAuth } from '../Authentication/RequireAuth';

export default function ProfilePage() {

  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);


  useEffect(()=>{
    localStorage.getItem("accessToken") && axios.post("http://localhost:8000/user/isLogin", {
    headers: {
        'authorization': `${localStorage.getItem("accessToken")}` 
    }
    })
    .then((res)=>{
        // console.log(res)
        setEmail(res.data.email);
        setName(res.data.name);
        setRole(res.data.role)
    })
    .catch((err)=>{
        
    })
  },[])

  const auth = useAuth();
  const router = useRouter();

  const handleLogout = () => {
      auth.logout();
      router.push('/');
      console.log('oushed')
  }
  if(!auth.loggedIn){
    router.push('/')
  }
  
  return (
    <>
      <Head>
        <title>Profile Page | Agro App</title>
        <meta name="description" content="Profile Page for Agro App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900">{name}</h1>
            <div className="mt-4">
              <Image
                src={logo}
                alt="User Profile Picture"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
            <section className="mt-8">
              <h1 className="text-3xl font-extrabold text-gray-900">{email}</h1>
              <h1 className="text-3xl font-extrabold text-gray-900">You are currently a {role}</h1>
            </section>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </main>
    </>
  )
}
