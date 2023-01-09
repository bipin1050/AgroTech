import React from 'react'
import Footer from './Footer'
import Header from './Header'

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
    }
  ]
  return (
    <div>
      {products.map((product,idx) => {
          return (
            <div>
              <div>
                <img width={200} src={product.img} />
              </div>
              <div>
                <span>{product.name}</span>
                <span>{product.productRating}</span>
              </div>
              <div>
                <p> Rs. {product.price} per unit</p>
              </div>
              <button>Add to Cart</button>
            </div>
          )
        })}
    </div>
  )
}

export default Products