import React, { useEffect, useState } from 'react'
// import Footer from './Footer'
// import Header from './Header'
// import products from '../constants/Products'
import StarSharpIcon from '@mui/icons-material/StarSharp';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Router, { useRouter } from 'next/router';

const Products = () => {

  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const router = useRouter();

  useEffect(()=>{
    axios.get(`http://localhost:8000/plans/allPlans/${pageNo}`)
    .then((res)=>{
      setProducts(res.data.data)
      setPageCount(Math.ceil(res.data.totalcount))
      console.log(res.data)
    }).catch(()=>{
        console.log("Error while fetching products form the server")
    })
  }, [pageNo])
  
  const handleAddToCart = (id) => {
    axios.post("http://localhost:8000/plans/addCart", {
      headers: {
        'authorization': `${localStorage.getItem("accessToken")}` 
      },
      productid : id
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
        console.log(err)
    })
  }

  const handleProductDetails = (id) => {
    // router.push(`/products/${id}`)
    router.push({
      pathname: `/products/${id}`,
      query: { id: id }
  })
  }

  const handlePrevPage = () => {
    setPageNo(pageNo-1)
  }
  const handleNextPage = () => {
    setPageNo(pageNo+1)
  }
  return (
  <>
    <div className='flex flex-wrap justify-around gap-5 w-full my-5 p-5 bg-primary rounded-md overflow-hidden'>
      {products.map((product,idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                handleProductDetails(product._id);
              }}
              className="flex flex-wrap w-[18%] justify-center relative rounded-md bg-[#EFEFEF] transition ease-in-out delay-350 hover:shadow-[0px_1px_3px_1px_rgba(0,0,0,0.65)] py-2">
              <div className="p-1 w-full">
                <img
                  className="block object-cover object-center rounded-lg h-[150px] w-full"
                  src={`http://localhost:8000/images/${product.image}`}
                />
              </div>

              <div className="flex flex-col justify-between w-full p-3">
                <span className="text-xl font-medium">{product.name}</span>
                <div className="absolute right-2 rounded-md bg-[#fff] px-2">
                  <span>{product.ratingsAverage}</span>
                  <StarSharpIcon style={{ color: "yellow" }} />
                </div>
                <p className="text-md font-light">
                  {" "}
                  Rs. {(product.price * (100 - product.discount)) / 100} per
                  unit
                </p>
                <div className="flex flex-row text-gray-400">
                  <p className="line-through">{product.price}</p>
                  <p className="px-2">-{product.discount}%</p>
                </div>
              </div>
              {/* <div className='flex flex-row justify-center gap-3 rounded-3xl bg-cyan-500 p-3 cursor-pointer hover:bg-cyan-600'>
                <button className='' onClick={()=> {handleAddToCart(product._id)}}>Add to Cart <AddShoppingCartIcon /></button>
                 <AddShoppingCartIcon /> 
              </div> */}
            </div>
          );
        })}
    </div>
    <div>
      {pageNo !== 0 && <button onClick={handlePrevPage}><KeyboardArrowLeftIcon /></button>}
      <span>{pageNo + 1}</span>
      {pageCount-pageNo !== 1 && <button onClick={handleNextPage}><KeyboardArrowRightIcon /></button>}

    </div>
  </>
  )
}

export default Products
                                             