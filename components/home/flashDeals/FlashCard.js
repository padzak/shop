import Link from "next/link";
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";

export default function FlashCard({ product }) {
    return (
        <div className={styles.card}>
            <div className={styles.card__image}>
                <Link href={`${product.link}`}>
                    <img src={product.image} alt=""/>
                </Link>
                <div className={styles.flash}>
                    <MdFlashOn />
                    <span>-{product.discount}%</span>
                </div>
            </div>
            <div className={styles.card__price}>
                <span>{(product.price - product.price / product.discount).toFixed(2)} PLN</span>
                <span>
                    30-day lowest price {product.lowest30DaysPrice} PLN
                </span>
            </div>
            <div className={styles.card__bar}>
                <div className={styles.card__bar_inner} style={{width: `${product.sold}%`}}></div>
            </div>
            <div className={styles.card__percentage}>{product.sold}%</div>
        </div>
    );
}