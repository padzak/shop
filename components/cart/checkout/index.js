import styles from "./styles.module.scss";

export default function Checkout({ subtotal, shippingFee, total, selected }) {
  return (
    <>
      <div className={`${styles.cart__checkout} ${styles.card}`}>
        <h2>Order summary</h2>
        <div className={styles.cart__checkout_line}>
          <span>Subtotal</span>
          <span>{subtotal} PLN</span>
        </div>
        <div className={styles.cart__checkout_line}>
          <span>Shipping</span>
          <span>{shippingFee} PLN</span>
        </div>
        <div className={styles.cart__checkout_line}>
          <span>Total</span>
          <span>{total} PLN</span>
        </div>
        <div className={styles.submit}>
            <button className={styles.submit__button} disabled={!selected}>Checkout</button>
        </div>  
      </div>
    </>
  );
}
