{products.map((product,idx) => {
    return (
      
      <div className='flex flex-wrap w-1/3'>
        <div className='p-1 md:p-2'>
          <img className="block object-cover object-center w-full h-full rounded-lg" src={product.img} />
        </div>
        <div>
          <span>{product.name}</span>
          <span>{product.productRating}</span>
        </div>
        <div>
          <p> Rs. {product.price} per unit</p>
        </div>
        <button>Add to Cart</button>
      </div>
    )
  })}