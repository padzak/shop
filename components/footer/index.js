import React from "react";
import styles from "./styles.module.scss";
import Links from "./Links";
import Socials from "./Socials";
import NewsLetter from "./Newsletter";
import Payments from "./Payments";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <Links />
                <Socials />
                <NewsLetter />
                <Payments />
            </div>
        </footer>
    )
}