import Empty from "@/components/cart/empty";
import Header from "../components/cart/header";
import styles from "../styles/cart.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import Product from "@/components/cart/product";
import CartHeader from "@/components/cart/cartHeader";
import Checkout from "@/components/cart/checkout";

export default function Cart() {
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  return (
    <>
      <Header country="" />
      <div className={styles.cart}>
          {cart.cartItems.length > 0 ? (
            <div className={styles.cart__container}>
              <CartHeader cartItems={cart.cartItems} />
              <div className={styles.cart__products}>
                {cart.cartItems.map((product) => (
                  <Product
                    product={product}
                    key={product._uid}
                    selected={selected}
                    setSelected={setSelected} />
                ))}
              </div>
              <Checkout
                subtotal="44444"
                shippingFee=""
                total="44444"
                selected={[]}
              />
            </div>
          ) : (
            <Empty />
          )}
        </div>
    </>
  );
}
