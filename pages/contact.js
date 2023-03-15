import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Head from "next/head";

const contact = () => {
  return (
    <div>
      <Head>
        <title>Contact | AgroTech</title>
        <meta name="description" content="Agro tech - shop fresh here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-center text-gray-900 mb-8">
              Get In Touch
            </h2>
            <p className="text-lg leading-relaxed mb-8 text-center text-gray-700">
              We'd love to hear from you. You can contact us by phone, email, or
              through our social media channels.
            </p>
            <div className="flex flex-wrap justify-center items-center">
              <div className="flex items-center mr-8 mb-8">
                <MailIcon className="text-gray-700 mr-2 text-2xl" />
                <p className="text-lg leading-relaxed text-gray-700 font-medium">
                  info@agrotech.com
                </p>
              </div>
              <div className="flex items-center mr-8 mb-8">
                <LocalPhoneIcon className="text-gray-700 mr-2 text-2xl" />
                <p className="text-lg leading-relaxed text-gray-700 font-medium">
                  9863490911
                </p>
              </div>
              <div className="flex items-center mr-8 mb-8">
                <FacebookIcon className="text-gray-700 text-2xl" />
              </div>
              <div className="flex items-center mr-8 mb-8">
                <TwitterIcon className="text-gray-700 text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default contact;
