import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { RiSearch2Line } from 'react-icons/ri';
import { FaOpencart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Main() {
    const cart = useSelector((state) => ({ ...state }));
    return (
        <div className={styles.main}>
            <div className={styles.main__container}>
                <Link legacyBehavior href="/">
                    <a className={styles.logo}>
                        <img src="https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/6087f2b060c7a92408bac811_logo.svg"/>
                    </a>
                </Link>
                <div className={styles.search}>
                    <input type="text" placeholder="Search for products, brands and more"/>
                    <div className={styles.search__icon}>
                        <RiSearch2Line />
                    </div>
                </div>
                <Link legacyBehavior href="/cart">
                    <a className={styles.cart}>
                        <FaOpencart />
                        <span style={{color:"black"}}>{0}</span>
                    </a>
                </Link>
            </div>
        </div>
    )
}