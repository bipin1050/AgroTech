import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import profile_picture from '../assets/img/profile.png'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
const Profile = () => {
    const [isEntriesClicked,setEntriesClicked] = useState(false);
    const [isViewClicked,setViewClicked] = useState(false);
  return (
    <>
    <Head>
        <title>Profile | Agro Tech</title>
        <meta name="description" content="Profile Page for Agro App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className='px-32'>
    <div className='bg-primary my-10 rounded-md  flex flex-col justify-center items-center'>
        <div className='flex flex-row justify-center gap-16 mt-10 pb-5 border-b border-black'>
        <div className='rounded-full h-52 w-52 '><img src={profile_picture.src} className="h-full w-full" alt="Profile Picture" /></div>
        <div className='bg-white rounded-xl p-5 h-[223px] w-[701px] flex justify-start items-center'>
            <div className='font-medium text-xl'>
                <ul className='text-left'>
                    <li>Name: Bipin Khanal</li>
                    <li>Role: Retailer</li>
                    <li>Email: khanal.bipin1050@gmail.com</li>
                    <li>Location: Kathmandu</li>
                    <li>Some Information</li>
                </ul>
            </div>
        </div>
        </div>
        
        <div className='flex flex-col gap-5 items-center w-11/12 lg:w-3/5 m-5'> <div onClick={() => {setEntriesClicked(!isEntriesClicked)}}>
            <button className='bg-white border-black border px-3  rounded-xl'>Add Entries <span > {isEntriesClicked ? <ArrowDropUpIcon className='h-10 w-10' /> : <ArrowDropDownIcon className='h-10 w-10'  />}</span></button></div>
          {isEntriesClicked && (
        <div className='bg-white flex  flex-col w-1/2 rounded-xl p-10 justify-center py-10 ' >
            <div className='flex flex-col gap-5 justify-start items-start w-11/12'>
            <div className='flex flex-col lg:flex-row  w-full'>
            <label className='w-1/3'>Name</label>
            <input className='bg-gray-200 rounded-md w-2/3' />
            </div>
            <div className='flex flex-col lg:flex-row w-full  '>
            <label className='w-1/3'>Life Time</label>
            <input className='bg-gray-200 rounded-md w-2/3 ' />
            </div>
            <div className='flex flex-col lg:flex-row w-full'>
            <label className='w-1/3'>Price </label>
            <input className='bg-gray-200 rounded-md w-2/3' />
            </div>
            <div className='flex flex-col lg:flex-row w-full '>
            <label className='w-1/3'>Discount</label>
            <input className='bg-gray-200 rounded-md w-2/3' />
            </div>
            <button className=' self-center bg-gray-200 px-3 py-1 rounded-lg '>Submit</button>
            </div>
            
            </div>
          )}
           </div>

        <div className='flex w-full flex-col items-start  m-5'>
        <div className='self-center' onClick={() => {setViewClicked(!isViewClicked)}}>
            <button className='bg-white border-black border px-3 rounded-xl '>View Entries <span > {isViewClicked ? <ArrowDropUpIcon className='h-10 w-10' /> : <ArrowDropDownIcon className='h-10 w-10'  />}</span></button>
            </div>
            {isViewClicked &&(
            <div className='grid  grid-cols-1 lg:grid-cols-2 gap-10 self-center justify-center items-center w-11/12 p-10'>
                <div className='bg-white flex flex-col rounded-xl p-10 justify-center  '>
                <div className='flex flex-col gap-5 justify-start items-start w-11/12'>
            <div className='flex flex-row  w-full'>
            <span className='w-1/3'>Name</span>
            <span className=''>Mula</span>
            </div>
            <div className='flex flex-row w-full  '>
            <span className='w-1/3'>Life Time</span>
            <span className=''>30 days</span>
            </div>
            <div className='flex flex-row  w-full'>
            <span className='w-1/3'>Price</span>
            <span className=''>50</span>
            </div>
            <div className='flex flex-row w-full '>
            <span className='w-1/3'>Discount</span>
            <span className=''>5%</span>
            </div>
            <button className=' self-center  px-3 py-1 rounded-lg '>Submit</button>
            </div></div>
            <div className='bg-white flex flex-col rounded-xl p-10 justify-center  '>
                <div className='flex flex-col gap-5 justify-start items-start w-11/12'>
            <div className='flex flex-row w-full'>
            <span className='w-1/3'>Name</span>
            <span className=''>Saag</span>
            </div>
            <div className='flex flex-row w-full  '>
            <span className='w-1/3'>Life Time</span>
            <span className=''>30 days</span>
            </div>
            <div className='flex flex-row w-full'>
            <span className='w-1/3'>Price</span>
            <span className=''>50</span>
            </div>
            <div className='flex flex-row w-full '>
            <span className='w-1/3'>Discount</span>
            <span className=''>5%</span>
            </div>
            <button className=' self-center  px-3 py-1 rounded-lg '>Submit</button>
            </div></div>
            </div>
  )}
           </div>
        </div>
        
        </div>
        
        </>
  )
}

export default Profile