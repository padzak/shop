import styles from './styles.module.scss';
import { similar_products } from '../../../data/products';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function SimilarSwiper(  ) {
    return (
        <Swiper 
            slidesPerView={4}
            spaceBetween={1}
            slidesPerGroup={3}
            navigation={true}
            modules={[Navigation]}
            className="swiper similar__swiper"
        >
            {
                similar_products.map((product) => (
                    <SwiperSlide key={product.name}>
                        <Link href="" >
                            <img src={product} alt={product.seo} />
                        </Link>    
                    </ SwiperSlide>
                ))
            }
        </Swiper>
        
    );
}