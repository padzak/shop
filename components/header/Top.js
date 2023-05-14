import React from "react";
import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Top() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li>
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/240px-Flag_of_Europe.svg.png"
                            alt=""
                        />
                        <span>English / EUR</span>
                    </li>
                    <li>
                        <MdSecurity />
                        <span>Buyer Protection</span>
                    </li>
                    <li>
                        <span>Customer Service</span>
                    </li>
                    <li>
                        <span>Help</span>
                    </li>
                    <li>
                        <BsSuitHeart />
                        <Link href="/profile/wishlist">
                            <span>Wishlist</span>
                        </Link>
                    </li>
                    <li>
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
                        <UserMenu loggedIn={loggedIn}/>
                    </li>

                </ul>
            </div>
        </div>
    );
}