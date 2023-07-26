import styles from './styles.module.scss';
import { useSession } from 'next-auth/react';
import { defaultUser } from '@/data/user';
import Link from 'next/link';
import { IoSettingsOutline } from 'react-icons/io5';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { AiOutlineMessage } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import 'swiper/css/navigation';
import { EffectCards, Navigation } from "swiper";
import { userSwiperArray } from '@/data/home';

export default function User() {
    const { data: session } = useSession();
    return (
        <div className={styles.user}>
            <img  src="" alt=""/>
            <div className={styles.user__container}>
                {
                    session ? (
                        <div className={styles.user__info}>
                            <img src={session.user?.image} alt=""/>
                            <h4>{session.user.name}</h4>
                        </div>
                    ) : (
                        <div className={styles.user__info}> 
                            <img src={defaultUser.image} alt=""/>
                            <div className={styles.user__info__buttons}>
                                <button>Register</button>
                                <button>Login</button>
                            </div>
                        </div>
                    )
                }
                <ul className={styles.user__links}>
                    <li>
                        <Link legacyBehavior href="">
                            <a>
                                <IoSettingsOutline />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="">
                            <a>
                                <HiOutlineClipboardList />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="">
                            <a>
                                <AiOutlineMessage />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="">
                            <a>
                                <BsHeart />
                            </a>
                        </Link>
                    </li>
                </ul>
                <div className={styles.user__swiper}>
                    <img
                        src="https://assets.stickpng.com/images/5a5a6d2414d8c4188e0b088d.png"
                        alt=""
                        className={styles.new}
                    />
                    <Swiper
                        effect={"cards"}
                        grabCursor={true}
                        navigation={true}
                        loop={true}
                        modules={[EffectCards, Navigation]}
                        className="userSwiper"
                        style={{
                            maxWidth: "180px",
                            height: "240px",
                            marginTop: "1rem",
                        }}
                    >
                        {userSwiperArray.map((item) => (
                            // eslint-disable-next-line react/jsx-key
                            <SwiperSlide>
                                <Link href="">
                                <img src={item.image} alt="" />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}