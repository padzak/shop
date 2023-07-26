import styles from './styles.module.scss'
import { swiperContent } from '@/data/mainSwiper';

import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function MainSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mainSwiper"
      >
        {[...Array(4).keys()].map((i) =>(
            // eslint-disable-next-line react/jsx-key
            <SwiperSlide>
              <img src={swiperContent[i]} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
