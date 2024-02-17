import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";
import { defaultUser } from "@/data/user";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import { EffectCards, Navigation } from "swiper";
import { userSwiperArray } from "@/data/home";

export default function User() {
  const { data: session } = useSession();
  return (
    <div className={styles.user}>
      <img src={defaultUser.header} alt="" />
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__info}>
            <img
              className={styles.user__header}
              src={session.user?.image}
              alt=""
            />
            <h4>{session.user.name}</h4>
          </div>
        ) : (
          <div className={styles.user__info}>
            <img src={defaultUser.image} alt="" />
            <div className={styles.user__info__buttons}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <li>
            <Link href="">
                <IoSettingsOutline />
            </Link>
          </li>
          <li>
            <Link href="">
              <HiOutlineClipboardList />
            </Link>
          </li>
          <li>
            <Link href="">
              <AiOutlineMessage />
            </Link>
          </li>
          <li>
            <Link href="">
              <BsHeart />
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <img
            src="https://assets.stickpng.com/images/5a5a6d2414d8c4188e0b088d.png"
            alt=""
            className={styles.user__header}
          />
          <Swiper
            effect={"cards"}
            grabCursor={true}
            navigation={true}
            loop={true}
            // TODO update swiper to work properly with effect cards
            // modules={[EffectCards, Navigation]}
            className="userSwiper"
            style={{
              maxWidth: "180px",
              position: "relative",
              height: "240px",
              marginTop: "4rem",
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
          <img
            src="../../../images/userHeader.jpg"
            alt=""
            className={styles.user__footer}
          />
        </div>
      </div>
    </div>
  );
}
