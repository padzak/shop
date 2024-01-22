import styles from "./styles.module.scss";
import { visa, mastercard, blik, buyerProtection } from "@/data/links";

export default function PaymentMethods() {
    return (
        <div className={`${styles.card} ${styles.cart__method}`}>
           <h2 className={styles.header}>Payment methods</h2>
           <div className={styles.images}>
            <img src={visa} alt="visa" />
            <img src={mastercard} alt="mastercard" />
            <img src={blik} alt="blik" />
           </div>
           <h2 className={styles.header}>Buyer protection</h2>
           <div className={styles.protection}>
            <img src={buyerProtection} alt="buyerProtection" />
            Get your item or get your money back
           </div>
        </div>
    );
}