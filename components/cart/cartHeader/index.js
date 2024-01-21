import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
// TODO there is something wrong with the header on the cart page. It is covered for some reason

export default function CartHeader({ cartItems, selected, setSelected }) {
    const [active, setActive] = useState(false);
    useEffect(() => {
      const check = JSON.stringify(cartItems) === JSON.stringify(selected);
      setActive(check);
    }, [cartItems, selected]);
    return <div className={`${styles.cart__header} ${styles.card}`}>
        <h1>Item Summary({ cartItems.length })</h1>
        <div className={styles.flex}>
            <div className={`${styles.checkbox} ${active ? styles.active : ""}`}>
                <span>Select all items</span>
            </div>
        </div>
    </div>;
}