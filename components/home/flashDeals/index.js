import Countdown from "@/components/countdown";
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import { flashDealsArray } from "@/data/home";
import FlashCard from "./FlashCard";

export default function FlashDeals() {
    return (
        <div className={styles.flashDeals}>
            <div className={styles.flashDeals__header}>
                <h1>FLASH SALE <MdFlashOn /></h1>
                <Countdown />
            </div>
            <Swiper
                slidesPerView={6}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="flashDealsSwiper"
            >
                <div className={styles.flashDeals__list}>
                    {flashDealsArray.map((item, i) => (
                        <SwiperSlide>
                            <FlashCard product={item} key={i} />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </div>
    );
}