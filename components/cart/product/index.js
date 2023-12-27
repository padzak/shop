import styles from "./styles.module.scss";
import { storeImg } from "@/data/links";
export default function Product({ product }) {
    return (
        <>
            <div className={`${styles.card} ${styles.product}`}>
                {product.quantity < 1 && <div className={styles.blur}></div>}
                <div className={styles.product__header}>
                    <img src={storeImg} alt="store" />
                    OFFICIAL STORE
                </div>
            </div>
        </>
    )
}