import React from "react";
import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RiArrowDropDownFill } from "react-icons/ri";

export default function Top() {
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
                        <span>Wishlist</span>
                    </li>
                    <li>
                        <div className={styles.flex}>
                            <RiAccountPinCircleLine />
                            <span>Account</span>
                            <RiArrowDropDownFill />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}