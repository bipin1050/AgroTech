import React, { useEffect, useState } from 'react'
// import Footer from './Footer'
// import Header from './Header'
import products from '../constants/Products'
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Products = () => {

 // const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // useEffect(()=>{
  //   axios.get(`http://localhost:8000/plans/allPlans/${pageNo}`)
  //   .then((res)=>{
  //     setProducts(res.data.data)
  //     setPageCount(Math.ceil(res.data.totalcount))
  //     // console.log(res.data)
  //   }).catch(()=>{
  //       console.log("Error while fetching products form the server")
  //   })
  // }, [pageNo])
  
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

  const handlePrevPage = () => {
    setPageNo(pageNo-1)
  }
  const handleNextPage = () => {
    setPageNo(pageNo+1)
  }
  return (
  < >
 <div className="my-5 px-5 py-5  bg-primary">
   <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group bg-[#EFEFEF] rounded-xl p-2 transition ease-in-out delay-350 hover:shadow-md  py-5 hover:scale-105">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 ">
                <img
                  src={product.img}
                  alt={product.imageAlt}
                  className="h-[200px] w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className='mt-4  flex flex-row justify-between items-center'>
              <h3 className="font-semibold ">{product.name}</h3>
              
                <div className=' bg-white px-2 rounded-xl '>
              <span className='text-red-700'  >{product.productRating}</span>
              <StarIcon className='text-yellow-400' />
              
              </div>
              </div>
              <div className='mt-1 flex flex-row justify-between '>
              <p className='text-lg font-medium text-gray-700'>Rs.{product.price} per unit</p>
              <p>(4321)</p>
              </div>
              <div className='flex flex-row gap-3'>
              <del>
              <p className="mb-1 text-sm text-gray-900">Rs.70</p></del>
              <p className='text-sm'>-10%</p>
              </div>
              <div className='flex flex-row w-2/5 justify-center  rounded-xl bg-[#2B7100] py-2 cursor-pointer hover:bg-cyan-600'>
          <button className='text-sm text-white' onClick={()=> {handleAddToCart(product._id)}}>Add to Cart </button>
          
          </div>
            </a>
          ))}
        </div>
      
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
                                             