import React from 'react'

export const Category = () => {

  const itemList = [
    "fruits",
    "vegetable",
    "agriItems",
    'category 1',
    'category 2',
    'category 3',
    'category 4',
    'category 5',
  ]


  return (
    <div className='bg-primary flex flex-col w-1/4 rounded-2xl px-10'  >
      <h1 className='text-xl py-5'>Category List</h1>
        {itemList.map((item,idx) => {
          return (
            <div >
              <li className='list-none pt-2'>
                <ul>{item}</ul>
              </li>
            </div>
          )
        })}
    </div>
  )
}
