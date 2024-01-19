import styles from "./styles.module.scss";

// TODO there is something wrong with the header on the cart page. It is covered for some reason

export default function CartHeader({ cartItems }) {
    return <div className={`${styles.cart__header} ${styles.card}`}>
        <h1>Item Summary({ cartItems.length })</h1>
        <div className={styles.flex}>
            <div className={styles.checkbox}>
                <span>Select all items</span>
            </div>
        </div>
    </div>;
}