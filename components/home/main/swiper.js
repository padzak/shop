import styles from './styles.module.scss'
import { swiperContent } from '@/data/mainSwiper';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
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
            <SwiperSlide key={i}>
              <img src={swiperContent[i]} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
