<div className='grid grid-cols-4 justify-center  w-full my-5 px-5 py-10 bg-primary'>
{products.map((product,idx) => {
    return (
      <div key ={idx} className='flex flex-wrap w-[22%] justify-center relative rounded-2xl bg-white transition ease-in-out delay-350 hover:shadow-[0px_15px_0x_0px_rgba(0,0,0,0.56)]  py-5 hover:scale-105'>
        <div className='p-1 md:p-2 w-4/5 '>
          <img className="block object-cover object-center rounded-lg h-[200px] w-full" src={product.img} />
        </div>
        
        <div className='flex flex-col  w-4/5 p-3'>
          <span className='text-xl font-medium'>{product.name}</span>
          <div className='absolute right-10 rounded-2xl bg-red-600 px-2'>
          <span >{product.productRating}</span>
          <StarIcon />
        </div>
          <p className='text-md  text-amber-600'> Rs. {product.price} per unit</p>
          <div className='flex flex-row gap-5'>
          <p className='font-light line-through'> Rs. 700</p>
          <p>-10 %</p>
          </div>
        </div>
        <div className='flex flex-row justify-center gap-3 rounded-3xl bg-cyan-500 p-3 cursor-pointer hover:bg-cyan-600'>
          <button className='' onClick={()=> {handleAddToCart(product._id)}}>Add to Cart <AddShoppingCartIcon /></button>
          {/* <AddShoppingCartIcon /> */}
          </div>
      </div>
    )
  })}
</div>