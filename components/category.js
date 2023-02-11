import React from 'react'

export const Category = () => {

  const itemList = [
    "fruits",
    "vegetable",
    "agriItems"
  ]


  return (
    <div className='flex flex-row justify-around w-full'  >
        {itemList.map((item,idx) => {
          return (
            <div >
              <li className='list-none'>
                <ul>{item}</ul>
              </li>
            </div>
          )
        })}
    </div>
  )
}
