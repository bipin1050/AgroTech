import React, { useEffect, useState } from 'react'
// import Footer from './Footer'
// import Header from './Header'
// import products from '../constants/Products'
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Products = () => {

  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(()=>{
    axios.get(`http://localhost:8000/plans/allPlans/${pageNo}`)
    .then((res)=>{
      setProducts(res.data.data)
      setPageCount(Math.ceil(res.data.totalcount))
      // console.log(res.data)
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

  const handlePrevPage = () => {
    setPageNo(pageNo-1)
  }
  const handleNextPage = () => {
    setPageNo(pageNo+1)
  }
  return (
  <>
    <div className='flex flex-wrap justify-start gap-10 w-full my-5 px-5 py-10 bg-primary'>
      {products.map((product,idx) => {
          return (
            <div key ={idx} className='flex flex-wrap w-[22%] justify-center relative rounded-2xl bg-white transition ease-in-out delay-350 hover:shadow-[0px_22px_70px_4px_rgba(0,0,0,0.56)]  py-5 hover:scale-110'>
              <div className='p-1 md:p-2 w-4/5 border-2 border-black  '>
                <img className="block object-cover object-center rounded-lg h-[200px] w-full" src={product.img} />
              </div>
              
              <div className='flex flex-col  w-4/5 p-3'>
                <span className='text-xl font-medium'>{product.name}</span>
                <div className='absolute right-10 rounded-2xl bg-red-600 px-2'>
                <span >{product.productRating}</span>
                <StarIcon />
              </div>
                <p className='text-md font-light'> Rs. {product.price} per unit</p>
              </div>
              <div className='flex flex-row justify-center gap-3 rounded-3xl bg-cyan-500 p-3 cursor-pointer hover:bg-cyan-600'>
                <button className='' onClick={()=> {handleAddToCart(product._id)}}>Add to Cart <AddShoppingCartIcon /></button>
                {/* <AddShoppingCartIcon /> */}
                </div>
            </div>
          )
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
                                             