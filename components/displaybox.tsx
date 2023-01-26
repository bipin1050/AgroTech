import React from 'react'
import { Category } from './category'
<<<<<<< HEAD
import Slider from './slider'

const Displaybox = () => {
  return (
    <div className='displayBox flex justify-start w-2/5'>
        <Category />
        <Slider />
=======
import ImageSlider from './Slider'

const Displaybox = () => {
  return (
    <div className='displayBox'>
        <Category />
        <ImageSlider />
>>>>>>> f356110e54f6878cf9bcef50ad16c20a6402f858
    </div>
  )
}

export default Displaybox