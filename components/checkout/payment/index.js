import styles from "./styles.module.scss";

export default function Payment({ paymentMethod, setPaymentMethod }) {
  return (
    <div className={styles.payment}>
      <div className={styles.header}>
        <h3>Payment Method</h3>
      </div>
    </div>
  );
}
