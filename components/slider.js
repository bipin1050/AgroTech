import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import products from '../constants/Products';
const ImageSlider = () => {
    return (
        <div className='w-3/4  h-[400px] bg-primary rounded-2xl'>
        <Carousel 
            showArrows={true}
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            infiniteLoop = {true}
            autoPlay={true}
            interval={3000}
            useKeyboardArrows={false}
            emulateTouch={false}
           
            className={'custom-class w-full h-[400px] '}>
                {products.map((product,idx) => {
                    return(
                    <div key ={idx} className='h-2/3'>
                        <img src={product.img} className="h-[400px] rounded-2xl" alt='image1' />
                    </div>

                )})}
        </Carousel>
        </div>
    );
}

export default ImageSlider;
