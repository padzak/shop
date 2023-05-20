import styles from './styles.module.scss';
import Link from 'next/link';
import { IoLocationSharp } from 'react-icons/io5';

export default function Copyrights() {
    return (
        <div className={styles.footer__copyrights}>
            <section>
                © 2023 Shop, All Rights Reserved. Designed by VIS Studio
            </section>
            <section>
                <ul>
                    {
                        data.map((link) => (
                            // eslint-disable-next-line react/jsx-key
                            <li>
                                <Link href={link.link} target="_blank">{link.name}</Link>
                            </li>
                        ))
                    }
                    <li>
                        <a>
                            <IoLocationSharp /> Poland
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}

const data = [
    {
        name: "Privacy Center",
        link: "",
    },
    {
        name: "Privacy & Cookie Policy",
        link: "",
    },
    {
        name: "Manage Cookies",
        link: "",
    },
    {
        name: "Terms & Conditions",
        link: "",
    }
]