import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Products from '../../components/products'

const Productpage = () => {

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
      query: { category: category },
    });
  };

  return (
    <div>
      <Head>
        <title>Products</title>
        <meta name="description" content="Agro tech - shop fresh here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        <div className="top-div flex flex-row justify-around py-2 bg-gray-100 shadow-[0px_1px_6px_1px_rgba(0,0,0,0.35)] sticky top-32 z-[1000]">
          {category.map((item, idx) => {
            return (
              <div
                key={idx}
                className="text-lg font-medium text-gray-700 py-1 rounded-lg hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  handleCategory(item.name);
                }}>
                {item.name}
              </div>
            );
          })}
        </div>

        <div className="products">
          <Products />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Productpage