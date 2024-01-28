import Empty from "@/components/cart/empty";
import Header from "../components/cart/header";
import styles from "../styles/cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Product from "@/components/cart/product";
import CartHeader from "@/components/cart/cartHeader";
import Checkout from "@/components/cart/checkout";
import PaymentMethods from "@/components/cart/paymentMethods";
import ProductSwiper from "@/components/productSwiper";
import { women_swiper } from "@/data/home";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { saveCart } from "@/requests/user";
import { updateCart } from "@/store/cartSlice";
import axios from "axios";

export default function Cart() {
  const router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // TODO fix cart updates on page refresh
  // useEffect(() => {
  //   const update = async () => {
  //     const { data } = await axios.post("/api/updateCart", {
  //       products: cart.cartItems,
  //     });
  //     dispatch(updateCart(data));
  //   };
  //   if (cart.cartItems.length > 0) {
  //     try {
  //       update();
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }
  // }, [cart.cartItems, dispatch]);

  useEffect(() => {
    setShippingFee(
      selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2)
    );
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
    setTotal(
      (
        selected.reduce((a, c) => a + c.price * c.qty, 0) + Number(shippingFee)
      ).toFixed(2)
    );
  }, [selected, shippingFee]);

  const saveCartToDbHandler = async () => {
    if (session) {
      const res = saveCart(selected, session.user.id);
      router.push("/checkout");
    } else {
      signIn();
    }
  };

  return (
    <>
      <Header country="" />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product
                  product={product}
                  key={product._uid}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
              saveCartToDbHandler={saveCartToDbHandler}
            />
            <PaymentMethods />
          </div>
        ) : (
          <Empty />
        )}
        <ProductSwiper products={women_swiper} />
      </div>
    </>
  );
}
