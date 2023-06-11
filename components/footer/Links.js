import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function Links() {
    return (
        <div className={styles.footer__links}>
            {links.map((link, i) => (
                // eslint-disable-next-line react/jsx-key
                <ul>
                    {
                        i===0 ? (
                            <img src="https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/6087f2b060c7a92408bac811_logo.svg" />
                            ) : (
                                <b>{link.heading}</b>
                            )
                    }
                    {link.links.map((link) => (
                        // eslint-disable-next-line react/jsx-key
                        <li>                           
                            <Link href={link.link}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            ))}
        </div>
        );
}

const links = [
    {
        heading: "SHOP",
        links: [
            {
                name: "About us",
                link: "",
            },
            {
                name: "Contact us",
                link: "",
            },
            {
                name: "Social Responsibility",
                link: "",
            },
            {
                name: "",
                link: "",
            },
        ],
    },
    {
        heading: "HELP & SUPPORT",
        links: [
            {
                name: "Shipping Info",
                link: "",
            },
            {
                name: "Returns",
                link: "",
            },
            {
                name: "How To Order",
                link: "",
            },
            {
                name: "How To Track",
                link: "",
            },
            {
                name: "Size Guide",
                link: "",
            }

        ],
    },
    {
        heading: "Customer Service",
        links: [
            {
                name: "Customer Service",
                link: "",
            },
        ],
    }
]