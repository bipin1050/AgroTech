import React from 'react'
import Footer from './Footer'
import Header from './Header'

import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Products = () => {

  const products = [
    {
      "name": "Kauli",
      "price": 50,
      "productRating": 3.8,
      "id": 1,
      "img": "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTK8nNyI5PHgrs__CwBhXbsJa_352BaHGG0MTCbKXhj2Zahv-5xIKVMQ9P34yzKWbUCQWaWVXGdZR10lRI"
    },
    {
      "name": "Banda",
      "price": 50,
      "productRating": 3.8,
      "id": 1,
      "img": "https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/09/Benefits-Of-Cabbage-589153824-770x533-1-650x428.jpg"
    },
    {
      "name": "Simi",
      "price": 50,
      "productRating": 3.8,
      "id": 1,
      "img": "https://urbanbazaar.com.np/wp-content/uploads/2021/04/beans.jpg"
    },
    {
      "name": "Banda",
      "price": 50,
      "productRating": 3.8,
      "id": 1,
      "img": "https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/09/Benefits-Of-Cabbage-589153824-770x533-1-650x428.jpg"
    },
    {
      "name": "Banda",
      "price": 50,
      "productRating": 3.8,
      "id": 1,
      "img": "https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/09/Benefits-Of-Cabbage-589153824-770x533-1-650x428.jpg"
    },
    {
      "name": "Banda",
      "price": 50,
      "productRating": 3.8,
      "id": 1,
      "img": "https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/09/Benefits-Of-Cabbage-589153824-770x533-1-650x428.jpg"
    },
  ]
  return (
    <div className='flex flex-wrap justify-center'>
    <div className='flex flex-wrap justify-start gap-5 w-full my-5 px-16 py-10 bg-[#53dd6c]'>
      
      {products.map((product,idx) => {
          return (
            <div className='flex flex-wrap w-[24%] justify-center relative rounded-2xl bg-white ease-out hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] py-5 hover:scale-110'>
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
    </div>
    
  )
}

export default Products
                                             