import React from 'react'
import { Category } from './category'
import Slider from './slider'

const Displaybox = () => {
  return (
    <div className='flex flex-row gap-16'>
        <Category />
        <Slider />
    </div>
  )
}

export default Displaybox