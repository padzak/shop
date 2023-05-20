import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function Links() {

    links.map((link) => { 
        console.log(link.links);        
    })
    return (
        <div className={styles.footer__links}>
            {links.map((link) => (
                // eslint-disable-next-line react/jsx-key
                <ul>
                    <b>{link.heading}</b>
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

        ],
    }
]