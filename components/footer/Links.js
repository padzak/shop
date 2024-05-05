import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { logo } from "@/data/links";

export default function Links() {
    return (
        <div className={styles.footer__links}>
            {links.map((link, i) => (
                <ul key={i}>
                    {
                        i===0 ? (
                            <img src={logo} />
                            ) : (
                                <b>{link.heading}</b>
                            )
                    }
                    {link.links.map((link, i) => (
                        <li key={i}>
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