import React, { useEffect, useState } from 'react'
// import Footer from './Footer'
// import Header from './Header'
// import products from '../constants/Products'
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

const Products = () => {

  const [products, setProducts] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8000/plans/allPlans")
    .then((res)=>{
      setProducts(res.data.data)
      // console.log(res.data.data)
    }).catch(()=>{
        console.log("Error while fetching products form the server")
    })
  }, [])
  
  return (
    
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
              <div className='flex flex-row justify-center gap-3 rounded-3xl bg-cyan-500 p-3 cursor-pointer'>
                <button className=''>Add to Cart</button>
                <AddShoppingCartIcon />
                </div>
             
            </div>
          )
        })}
    </div>
    
    
  )
}

export default Products
                                             