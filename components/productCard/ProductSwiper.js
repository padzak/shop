import styles from './styles.module.scss';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';

export default function ProductCard({ images }) {
    const swiperRef = useRef(null);
    return (
        <div className={styles.swiper}>
            <Swiper
                ref={swiperRef}
                centeredSlides={true}
                autoplay={{
                    delay: 500,
                    stopOnLastSlide: false,
                }}
                speed={500}
                modules={[Autoplay]}
            >
                {
                    images.map((image) => (
                        // eslint-disable-next-line react/jsx-key
                        <SwiperSlide>
                            <img src={image.url} alt="" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}