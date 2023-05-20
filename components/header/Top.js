import React from "react";
import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Top({ country }) {
    const [loggedIn, setLoggedIn] = React.useState(true);
    const [visible, setVisible] = React.useState(false);
    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li className={styles.li}>
                        <img 
                            src={country.flag}
                            alt=""
                        />
                        <span>{country.name} / EUR</span>
                    </li>
                    <li className={styles.li}>
                        <MdSecurity />
                        <span>Buyer Protection</span>
                    </li>
                    <li className={styles.li}>
                        <span>Customer Service</span>
                    </li>
                    <li className={styles.li}>
                        <span>Help</span>
                    </li>
                    <li className={styles.li}>
                        <BsSuitHeart />
                        <Link href="/profile/wishlist" legacyBehavior>
                            <span>Wishlist</span>
                        </Link>
                    </li>
                    <li className={styles.li}
                        onMouseOver={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        {loggedIn ? (
                            <li>
                                <div className={styles.flex}>
                                    <img
                                        src="https://www.pngarts.com/files/3/Avatar-Transparent-Image.png"
                                        alt=""
                                        />
                                    <span>Marcin</span>
                                    <RiArrowDropDownFill />
                                </div>
                            </li>
                        ) : (
                            <li>
                            <div className={styles.flex}>
                                <RiAccountPinCircleLine />
                                <span>Account</span>
                                <RiArrowDropDownFill />
                            </div>
                        </li>
                        )}
                        { visible && <UserMenu loggedIn={loggedIn}/> }
                    </li>

                </ul>
            </div>
        </div>
    );
}