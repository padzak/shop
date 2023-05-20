import React from "react";
import styles from "./styles.module.scss";
import Links from "./Links";
import Socials from "./Socials";
import NewsLetter from "./Newsletter";
import Payments from "./Payments";
import Copyrights from "./Copyrights";

export default function Footer({ country }) {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <Links />
                <Socials />
                <NewsLetter />
                <Payments />
                <Copyrights country={country}/>
            </div>
        </footer>
    )
}