import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Products from '../components/products'

const Productpage = () => {
  return (
    <div>
      <Header />
        <div>
          <div className='top-div flex justify-around'>
            <div className='category'>
              <ul>
                <li>Vegetables</li>
                <li>Fruits</li>
                <li>Dry Fruits</li>
                <li>Meats</li>
                <li>Diary</li>

              </ul>
            </div>
          </div>
          <div className='products'>
            <Products />
          </div>

        </div>
        <Footer />
    </div>
  )
}

export default Productpage