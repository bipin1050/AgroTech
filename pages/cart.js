import axios from 'axios';
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const Cart = () => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(()=>{
        axios.post("http://localhost:8000/plans/getCart", {
            headers: {
                'authorization': `${localStorage.getItem("accessToken")}` 
            }
        }).then((res)=>{
          setCartItems(res.data.products)
          console.log(res.data.products)
        }).catch((err)=>{
            // console.log("Error while fetching products form the server")
            console.log(err)
        })
      }, [])

      const handleRemoveFromCart = (id) => {
        axios.post(`http://localhost:8000/plans/deleteCart/${id}`, {
          headers: {
            'authorization': `${localStorage.getItem("accessToken")}` 
         } 
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
            console.log(err)
        })
      }

  return (
    <>
      <Head>
        <title>View Cart | AgroTech</title>
        <meta name="description" content="Profile Page for Agro App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="bg-gray-100 min-h-screen">
      {cartItems ? cartItems.map((product,idx) => {
          return (
            <div
              key={idx}
              className="flex flex-wrap w-[22%] justify-center relative rounded-2xl bg-white transition ease-in-out delay-350 hover:shadow-[0px_22px_70px_4px_rgba(0,0,0,0.56)]  py-5 hover:scale-110">
              <div className="p-1 md:p-2 w-4/5 border-2 border-black  ">
                <img
                  className="block object-cover object-center rounded-lg h-[200px] w-full"
                  src={`http://localhost:8000/images/${product.image}`}
                />
              </div>

              <div className="flex flex-col  w-4/5 p-3">
                <span className="text-xl font-medium">{product.name}</span>
                <div className="absolute right-10 rounded-2xl bg-red-600 px-2">
                  <span>{product.productRating}</span>
                  <StarIcon />
                </div>

                <p className="text-md font-light">
                  {" "}
                  Rs. {product.price} per unit
                </p>
              </div>
              <div className="flex flex-row justify-center gap-3 rounded-3xl bg-cyan-500 p-3 cursor-pointer">
                <button
                  className=""
                  onClick={() => {
                    handleRemoveFromCart(product._id);
                  }}>
                  Remove from Cart <AddShoppingCartIcon />
                </button>
                {/* <AddShoppingCartIcon /> */}
              </div>
            </div>
          );
        })
        :
        <div>No Items in the list</div>
        }
      </main>
    </>
  )
}

export default Cart