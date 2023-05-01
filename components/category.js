import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Category = () => {

  const router = useRouter();
  const [category, setCategory] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:8000/plans/getCategory").then((res) => {
      setCategory(res.data.data);
    });
  }, []);

  const handleCategory = (category) => {
    router.push({
      pathname: `/category`,
      query: {category: category},
    });
  }

  return (
    <motion.div
      className="bg-gray-100 flex flex-col w-1/4 rounded-xl px-10 shadow-[0px_1px_6px_1px_rgba(0,0,0,0.35)]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <h1 className="text-xl py-5 font-bold text-gray-700">Category List</h1>
      {category.map((item, idx) => {
        return (
          <div
            key={idx}
            className="pt-2 hover:cursor-pointer"
            whileHover={{ scale: 1.02 }}>
            <h3
              onClick={() => {
                handleCategory(item.name);
              }}
              className="text-gray-700 hover:text-green-600 font-medium transition duration-300 ease-in-out">
              {item.name}
            </h3>
          </div>
        );
      })}
    </motion.div>
  );
};
