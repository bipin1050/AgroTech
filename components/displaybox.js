import React from 'react'
import { Category } from './category'
import ImageSlider from './slider'

const Displaybox = () => {
  return (
    <div className='displayBox'>
        <Category />
        <ImageSlider />
    </div>
  )
}

export default Displaybox