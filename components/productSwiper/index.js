import styles from './styles.module.scss'
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function ProductSwiper({ header, products, bg }) {
    return (
        <div className={styles.productSwiper}>
            {
                header && <div
                            className={styles.header}
                            style={{ background: `${bg ? bg : ""}` }}
                            >
                                { header }
                            </div>
            }
            <Swiper
                slidesPerView={2}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="productSwiper"
                breakpoints={{
                    630: {
                        slidesPerView: 3,
                    },
                    840: {
                        slidesPerView: 4,
                    },
                    1000: {
                        slidesPerView: 5,
                    },
                    1250: {
                        slidesPerView: 6,
                    },
                }}
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
                                    <h1>{product.name.length > 30 ? `${product.name.slice(0,30)}...` : product.name}</h1>
                                    {
                                        product.price && <span>{product.price} PLN</span>
                                    }
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
                
            </Swiper>
        </div>
    );
}