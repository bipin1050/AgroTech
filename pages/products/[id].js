import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

import StarSharpIcon from '@mui/icons-material/StarSharp';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useAuth } from '../../Authentication/auth'


// const [product, setProduct] = useState([]);

// export const getStaticProps = async () => {
    
// }


const ProductDetails = () => {

    const [product, setProduct] = useState([]);

    const [quantity, setQuantity] = useState(1);

    const [readyBuy, setReadyBuy] = useState(false);

    const router = useRouter();

    const auth = useAuth();

    const { id } = router.query;
    // console.log(id)
    // console.log(router.query.id)
    useEffect(()=>{
        axios.get(`http://localhost:8000/plans/plan/${id}`)
        .then((res) => {
        console.log(res)
        setProduct(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
        }, [id])

    const handleAddQuantity = () => {
        setQuantity(quantity+1);
    }

    const handleSubQuantity = () => {
        if(quantity >1) 
            setQuantity(quantity-1);
    }

    const handleAddCart = () => {
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
    
    const handleBuyNow = () => {
        // if (confirm("Are you sure want to buy the Product") == true) {
        //     axios.post("http://localhost:8000/plans/buyProduct", {
        //     headers: {
        //         'authorization': `${localStorage.getItem("accessToken")}` 
        //     },
        //     productid : id,
        //     number : quantity
        //     }).then((res) => {
        //         console.log(res)
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // }
        setReadyBuy(true);
    }
  return (
    <div>
        <Header />
        <div className='flex justify-around w-[90%]'>
            <div>
                <div className='flex justify-around'>
                    <div>
                        Image
                    </div>
                    <div className='block flex flex-col '>
                        <span>{product.name}</span>
                        <span>{product.ratingsAverage} <StarSharpIcon /></span>
                        <span>Rs. {product.price*(100-product.discount)/100} per unit</span>
                        <span className='flex flex-row text-gray-400' >
                            <p className='line-through'>{product.price}</p>
                            <p className='px-2'>-{product.discount}%</p>
                        </span>
                        <span>
                            Quantity : 
                            <button onClick={handleSubQuantity}><IndeterminateCheckBoxIcon style={{ color: 'gray' }}/></button> 
                            {quantity} 
                            <button onClick={handleAddQuantity}><AddBoxIcon style={{ color: 'gray' }}/></button> 
                        </span>
                        <span>
                            <button onClick={handleBuyNow} className='bg-[#FF5732] w-48 p-2 mx-1 focus:opacity-[0.6]'>Buy Now</button>
                            <button onClick={handleAddCart} className='bg-[#2B7100] w-48 p-2 mx-1'>Add to Cart</button>
                        </span>
                    </div>
                </div>
                <div>
                    <h3>Product Description</h3>
                    <p>{product.description}</p>
                </div>
            </div>
            <div>
                Farmer side
            </div>
        </div>
        {
            readyBuy &&
            <div>
                <h1>Confirm Your Credentials</h1>
                <h3>Email : {auth.email}</h3>
                <h3>Location: Will update on next working days</h3>
            </div>
        }
        <div>
            Related Products
        </div>
        <Footer />
    </div>
  )
}

export default ProductDetails