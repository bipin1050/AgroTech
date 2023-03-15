import { CleaningServices } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect } from 'react'
import Footer from "../components/Footer"
import Header from "../components/Header"
import logo from '../assets/img/logo.png'
import Head from 'next/head'

const About = () => {

  // useEffect(()=>{
  //   axios.get('http://127.0.0.1:8000/plans/plan/1',{withCredentials: true}).then(()=>console.log("Hami dui bhai")).catch((rees)=>console.log(res))
  // })
  return (
    <div>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Agro tech - shop fresh here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Welcome to Agrotech
              </p>
            </div>

            <div className="mt-10">
              <div className="flex">
                <div className="md:flex-1 md:px-4">
                  <p className="mt-3 text-base text-gray-500">
                    Agrotech is a company dedicated to providing the best
                    agriculture solutions for farmers all around the world. We
                    understand the importance of agriculture in our society, and
                    we strive to make it more efficient and sustainable with our
                    innovative products and services. Our team is made up of
                    experts in the field who are passionate about making a
                    difference in the world. We believe that together, we can
                    achieve great things.AgroTech is an online B2B shopping
                    platform that specializes in agricultural products in Nepal.
                    The platform aims to simplify the process of purchasing agro
                    products for businesses in Nepal by offering a convenient
                    and efficient online marketplace.
                  </p>
                </div>
                <div className="">
                  <img
                    className="w-52 h-auto object-cover object-center"
                    src={logo.src}
                    alt="Agrotech"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 flex justify-around text-gray-500">
          <div className="flex flex-col items-center px-8 py-16 bg-gray-100 w-[82%]">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Our History
            </h2>
            <p className="text-lg mb-8">
              AgroTech was founded in 2022 by a team of agricultural experts
              with a vision to revolutionize the industry through technology.
              Over the years, we have expanded our product portfolio and
              established ourselves as a trusted partner to farmers around the
              world.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Social Responsibility
            </h2>
            <p className="text-lg mb-8">
              At AgroTech, we are committed to making a positive impact on
              society and the environment. We partner with local organizations
              to support sustainable farming practices and reduce waste.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Contact Us
            </h2>
            <p className="text-lg mb-8">
              For more information on our products and services, please contact
              us at info@agrotech.com.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About