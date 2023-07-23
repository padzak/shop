import styles from './styles.module.scss'


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
  const content = [
    "https://www.wordstream.com/wp-content/uploads/2021/07/persuasive-ads-coca-cola-1.jpg",
    "https://smartclip.tv/wp-content/uploads/2021/02/twitter-ad-format-gallery-2.jpg",
    "https://atomoje.pl/userdata/public/assets//pasek.png",
    "https://v.wpimg.pl/QUJDREVGfjQrJiR2eTxzIWh-cCw_ZX13P2ZoZ3lxY2EyazQsOiIjMDorfCIkMiE0PTR8NTpoMCUjayR0eSM4JjooMzx5Ijw3LyB9JmUmZ2d8ImRoMCFlZ2dwYnZmajNteCV_czN3NGx5IWAnZHFgdzc",
  ];
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
              <img src={content[i]} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
