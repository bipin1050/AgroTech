import React from 'react'

export const Category = () => {

  const itemList = [
    "fruits",
    "vegetable",
    "agriItems"
  ]


  return (
    <div>
        {itemList.map((item,idx) => {
          return (
            <div>
              <li>
                <ul>{item}</ul>
              </li>
            </div>
          )
        })}
    </div>
  )
}
