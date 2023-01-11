import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const contact = () => {
  return (
    <div>
      <Header />
        <div>
          <div className='top-div flex justify-around'>
            <div className='category'>
              category here
            </div>
            <div className='slider'>
              image slider here
            </div>
          </div>
          <div className='products'>
            Contect me
          </div>

        </div>
        <Footer />
    </div>
  )
}

export default contact