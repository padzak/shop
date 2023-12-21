import Header from "../components/cart/header";
import styles from "../styles/cart.module.scss";

export default function Cart() {
    const cart = [];
  return (
    <>
      <div>
        <Header country="" />
        <div className={styles.cart}>
            <div className={styles.cart__container}>
            {
                cart.length > 1 ? (
                    <div className={styles.cart__container}></div>
                ) : (
                    <div className={styles.empty}>empty</div>
                )
            }
            </div>
        </div>
      </div>
    </>
  );
}