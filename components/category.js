import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export const Category = () => {

  const router = useRouter();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/plans/getCategory").then((res) => {
      console.log(res.data.data);
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
    <div className="bg-primary flex flex-col w-1/4 rounded-2xl px-10">
      <h1 className="text-xl py-5">Category List</h1>
      {category.map((item, idx) => {
        return (
          <div className="pt-2">
            <h3 onClick={()=>{handleCategory(item.name)}}>{item.name}</h3>
          </div>
        );
      })}
      {/* {category} */}
    </div>
  );
};
