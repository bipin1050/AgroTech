import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'


// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";


// import Image from "next/image";



const ImageSlider = () => {


    // const [slideImg, setSlideImg] = useState(["http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTK8nNyI5PHgrs__CwBhXbsJa_352BaHGG0MTCbKXhj2Zahv-5xIKVMQ9P34yzKWbUCQWaWVXGdZR10lRI",
    //                                          "https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/09/Benefits-Of-Cabbage-589153824-770x533-1-650x428.jpg",
    //                                          "https://urbanbazaar.com.np/wp-content/uploads/2021/04/beans.jpg"
    //                                             ]);



    return (
        <Carousel showArrows={true}
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            // infinite={true}
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

    //     <Swiper
    //     autoplay={{
    //       delay: 2500,
    //       disableOnInteraction: false,
    //     }}
    //     grabCursor
    //     centeredSlides
    //     slidesPerView={1}
    //     spaceBetween={30}
    //     loop
    //     pagination
    //     className="mySwiper"
    //   >
    //     {slideImg.map((img, i) => (
    //       <SwiperSlide key={i}>
    //         <Image src={img} alt="" width={250} height={250} />
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>
    );
}

export default ImageSlider;
