import Empty from "@/components/cart/empty";
import Header from "../components/cart/header";
import styles from "../styles/cart.module.scss";
import { useSelector } from 'react-redux';

export default function Cart() {
  const { cart } = useSelector((state) => ({ ...state }));
  return (
    <>
      <div>
        <Header country="" />
        <div className={styles.cart}>
            <div className={styles.cart__container}>
            {
                cart.cartItems.length > 1 ? (
                    <div className={styles.cart__container}></div>
                ) : (
                    <Empty />
                )
            }
            </div>
        </div>
      </div>
    </>
  );
}