import React from "react";
import styles from "../styles/checkout.module.scss";
import { getSession } from "next-auth/react";
import User from "@/models/User";
import Cart from "@/models/Cart";
import db from "@/utils/db";
import Header from "@/components/cart/header";
import Shipping from "@/components/checkout/shipping";

export default function checkout({ cart }) {
  return (
    <>
      <Header />
      <div className={styles.checkout}>
        <div className={styles.checkout__side}>
            <Shipping />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(Context) {
  db.connectDb();
  const session = await getSession(Context);
  const user = await User.findById(session.user.id);
  const cart = await Cart.findOne({ user: user._id });
  db.disconnectDb();

  if (!cart) {
    return {
      redirect: "/cart",
    };
  }

  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
    },
  };
}
