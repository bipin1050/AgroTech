import React from 'react'
import { Category } from './category'
import ImageSlider from './Slider'

const Displaybox = () => {
  return (
    <div className='displayBox'>
        <Category />
        <ImageSlider />
    </div>
  )
}

export default Displaybox