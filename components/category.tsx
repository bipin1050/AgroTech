import React from 'react'

export const Category = () => {

  const itemList = [
    "fruits",
    "vegetable",
    "agriItems"
  ]


  return (
<<<<<<< HEAD
    <div>
        {itemList.map((item,idx) => {
          return (
            <div>
              <li>
=======
    <div className='flex flex-row justify-around w-full'  >
        {itemList.map((item,idx) => {
          return (
            <div >
              <li className='list-none'>
>>>>>>> Amrit
                <ul>{item}</ul>
              </li>
            </div>
          )
        })}
    </div>
  )
}
