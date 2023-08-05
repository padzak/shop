import styles from './styles.module.scss'
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function ProductSwiper({ header, products }) {
    return (
        <div className={styles.productSwiper}>
            {
                header && <div className={styles.header}>{ header }</div>
            }
            <Swiper
                slidesPerView={6}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="productSwiper"
            >
                {
                    products.map((product) => (
                        // eslint-disable-next-line react/jsx-key
                        <SwiperSlide>
                            <div className={styles.product}>
                                <div className={styles.product__image}>
                                    <img src={product.image} alt="" />
                                </div>
                                <div className={styles.product__infos}>
                                    <h1>{product.name.length > 35 ? `${product.name.slice(0,35)}...` : product.name}</h1>
                                    <span>{product.price} PLN</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
                
            </Swiper>
        </div>
    );
}