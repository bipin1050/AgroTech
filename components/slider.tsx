<<<<<<< HEAD
import React from 'react'

const Slider = () => {
  return (
    <div>Slider</div>
  )
}

export default Slider
=======
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const ImageSlider = () => {
    return (
        <Carousel showArrows={true}
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            infinite={true}
            autoPlay={true}
            interval={3000}
            useKeyboardArrows={false}
            emulateTouch={false}
            width={'400px'}
            height={'250px'}
            className={'custom-class'}>
            <div>
                <img src='http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTK8nNyI5PHgrs__CwBhXbsJa_352BaHGG0MTCbKXhj2Zahv-5xIKVMQ9P34yzKWbUCQWaWVXGdZR10lRI' alt='image1' />
            </div>
            <div>
                <img src='https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/09/Benefits-Of-Cabbage-589153824-770x533-1-650x428.jpg' alt='image2' />
            </div>
            <div>
                <img src='https://urbanbazaar.com.np/wp-content/uploads/2021/04/beans.jpg' alt='image3' />
            </div>
        </Carousel>
    );
}

export default ImageSlider;

>>>>>>> f356110e54f6878cf9bcef50ad16c20a6402f858
