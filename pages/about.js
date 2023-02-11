import { CleaningServices } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect } from 'react'
import Footer from "../components/Footer"
import Header from "../components/Header"

const About = () => {

  // useEffect(()=>{
  //   axios.get('http://127.0.0.1:8000/plans/plan/1',{withCredentials: true}).then(()=>console.log("Hami dui bhai")).catch((rees)=>console.log(res))
  // })
  return (
    <div>
      <Header />
        <div>
          <div className='top-div flex justify-around'>
            There is nothing about us. Just keep chiling boiz.
          </div>

        </div>
        <Footer />
    </div>
  )
}

export default About