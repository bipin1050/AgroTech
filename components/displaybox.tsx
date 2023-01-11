import React from 'react'
import { Category } from './category'
import Slider from './slider'

const Displaybox = () => {
  return (
    <div className='displayBox flex justify-start w-2/5'>
        <Category />
        <Slider />
    </div>
  )
}

export default Displaybox