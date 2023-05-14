import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { RiSearch2Line } from 'react-icons/ri';
import { FaOpencart } from 'react-icons/fa';

export default function Main() {
    return (
        <div className={styles.main}>
            <div className={styles.main__container}>
                <Link href="/">
                    <a className={styles.logo}>
                        <img src="../../public/images/logo.png"/>
                    </a>
                </Link>
                <div className={styles.search}>
                    <input type="text" placeholder="Search for products, brands and more"/>
                    <div className={styles.search__icon}>
                        <RiSearch2Line />
                    </div>
                </div>
                <Link href="/cart">
                    <a className={styles.cart}>
                        <FaOpencart />
                    </a>
                </Link>
            </div>
        </div>
    )
}