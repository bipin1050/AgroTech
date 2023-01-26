import React from 'react'

export const Category = () => {

  const itemList = [
    "fruits",
    "vegetable",
    "agriItems"
  ]


  return (
<<<<<<< HEAD
    <div className='flex flex-row justify-around w-full'  >
        {itemList.map((item,idx) => {
          return (
            <div >
              <li className='list-none'>
=======
    <div>
        {itemList.map((item,idx) => {
          return (
            <div>
              <li>
>>>>>>> f356110e54f6878cf9bcef50ad16c20a6402f858
                <ul>{item}</ul>
              </li>
            </div>
          )
        })}
    </div>
  )
}
