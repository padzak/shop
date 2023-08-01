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
                <Countdown date={new Date(2024, 8, 1)}/>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="flashDealsSwiper"
                breakpoints={{
                    450: {
                        slidesPerView: 2,
                    },
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