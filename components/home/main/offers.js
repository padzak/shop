import styles from './styles.module.scss'

import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import { offersList } from '../../../data/home';

export default function Offers() {
  return (
    <div className={styles.offers}>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offersSwiper"
      >
        { offersList.map((offer, i) => (
          // eslint-disable-next-line react/jsx-key
          <SwiperSlide key={i}>
            <Link href="">
              <img src={offer.image} alt=""/>
            </Link>
            <span>{offer.price}</span>
            <span>-{offer.discount}%</span>
          </SwiperSlide>
        )) }
      </Swiper>
    </div>
  );
}
