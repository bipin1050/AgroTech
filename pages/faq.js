import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { Collapse, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Head from "next/head";

const FAQ = () => {
  const [expanded, setExpanded] = useState(null);

  const handleAccordionChange = (panel) => {
    setExpanded(expanded === panel ? null : panel);
  };

  return (
    <div>
      <Head>
        <title>FAQ | AgroTech</title>
        <meta name="description" content="Agro tech - shop fresh here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-[55%] mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-center text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col">
              <div className="mb-4">
                <button
                  className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none"
                  onClick={() => handleAccordionChange("panel1")}>
                  <h3 className="text-lg leading-relaxed text-gray-900 font-medium">
                    What is Agrotech?
                  </h3>
                  <ExpandMoreIcon
                    className={`${
                      expanded === "panel1" ? "transform rotate-180" : ""
                    } transition-transform duration-300`}
                  />
                </button>
                <Collapse in={expanded === "panel1"}>
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <p className="text-lg leading-relaxed text-gray-700">
                      Agrotech is an online platform or software that enables
                      users to buy and sell vegetables and other agricultural
                      products online.
                    </p>
                  </div>
                </Collapse>
              </div>
              <Divider />
              <div className="mb-4">
                <button
                  className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none"
                  onClick={() => handleAccordionChange("panel2")}>
                  <h3 className="text-lg leading-relaxed text-gray-900 font-medium">
                    How does Agrotech work?
                  </h3>
                  <ExpandMoreIcon
                    className={`${
                      expanded === "panel2" ? "transform rotate-180" : ""
                    } transition-transform duration-300`}
                  />
                </button>
                <Collapse in={expanded === "panel2"}>
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <p className="text-lg leading-relaxed text-gray-700">
                      Agrotech works by connecting farmers or suppliers of
                      agricultural products with customers through an online
                      platform or software. Farmers can list their products on
                      the platform, and customers can browse and purchase them
                      online.
                    </p>
                  </div>
                </Collapse>
              </div>
              <Divider />
              <div className="mb-4">
                <button
                  className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none"
                  onClick={() => handleAccordionChange("panel3")}>
                  <h3 className="text-lg leading-relaxed text-gray-900 font-medium">
                    What are the benefits of using Agrotech to buy and sell
                    vegetables?
                  </h3>
                  <ExpandMoreIcon
                    className={`${
                      expanded === "panel3" ? "transform rotate-180" : ""
                    } transition-transform duration-300`}
                  />
                </button>
                <Collapse in={expanded === "panel3"}>
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <p className="text-lg leading-relaxed text-gray-700">
                      Using agrotech to buy and sell vegetables offers numerous
                      benefits, such as convenience, access to a wider customer
                      base, increased efficiency, and reduced costs.
                    </p>
                  </div>
                </Collapse>
              </div>
              <Divider />
              <div className="mb-4">
                <button
                  className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none"
                  onClick={() => handleAccordionChange("panel4")}>
                  <h3 className="text-lg leading-relaxed text-gray-900 font-medium">
                    What types of vegetables can be bought and sold on Agrotech?
                  </h3>
                  <ExpandMoreIcon
                    className={`${
                      expanded === "panel4" ? "transform rotate-180" : ""
                    } transition-transform duration-300`}
                  />
                </button>
                <Collapse in={expanded === "panel4"}>
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <p className="text-lg leading-relaxed text-gray-700">
                      Agrotech can be used to buy and sell various types of
                      vegetables, including but not limited to tomatoes,
                      cucumbers, peppers, lettuce, carrots, and onions.
                    </p>
                  </div>
                </Collapse>
              </div>
              <Divider />
              <div className="mb-4">
                <button
                  className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none"
                  onClick={() => handleAccordionChange("panel5")}>
                  <h3 className="text-lg leading-relaxed text-gray-900 font-medium">
                    How is the quality of the vegetables ensured when buying
                    from Agrotech?
                  </h3>
                  <ExpandMoreIcon
                    className={`${
                      expanded === "panel5" ? "transform rotate-180" : ""
                    } transition-transform duration-300`}
                  />
                </button>
                <Collapse in={expanded === "panel5"}>
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <p className="text-lg leading-relaxed text-gray-700">
                      The quality of the vegetables can be ensured through
                      various measures such as quality checks before shipping,
                      proper packaging, and a rating system for customers to
                      provide feedback on their purchases.
                    </p>
                  </div>
                </Collapse>
              </div>
              <Divider />
              <div className="mb-4">
                <button
                  className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none"
                  onClick={() => handleAccordionChange("panel6")}>
                  <h3 className="text-lg leading-relaxed text-gray-900 font-medium">
                    What happens if there is a problem with the delivery or the
                    vegetables received?
                  </h3>
                  <ExpandMoreIcon
                    className={`${
                      expanded === "panel6" ? "transform rotate-180" : ""
                    } transition-transform duration-300`}
                  />
                </button>
                <Collapse in={expanded === "panel6"}>
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <p className="text-lg leading-relaxed text-gray-700">
                      Agrotech  have a customer support system in place to
                      handle any issues or complaints regarding deliveries or
                      the quality of the vegetables received. Customers may be
                      able to request a refund or a replacement if there are any
                      issues with their purchase.
                    </p>
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
