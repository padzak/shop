import Empty from "@/components/cart/empty";
import Header from "../components/cart/header";
import styles from "../styles/cart.module.scss";
import { useSelector } from "react-redux";
import Product from "@/components/cart/product";

export default function Cart() {
  const { cart } = useSelector((state) => ({ ...state }));
  return (
    <>
      <div>
        <Header country="" />
        <div className={styles.cart}>
          <div className={styles.cart__container}>
            {cart.cartItems.length > 0 ? (
              <div className={styles.cart__container}>
                <div className={styles.cart__products}>
                  {cart.cartItems.map((product) => (
                    <Product product={product} key={product._uid} />
                  ))}
                </div>
              </div>
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
