import React from "react";
import styles from "../styles/checkout.module.scss";
import { getSession } from "next-auth/react";
import User from "@/models/User";
import Cart from "@/models/Cart";
import db from "@/utils/db";

export default function checkout() {
    return (
        <div>
            <h1>Checkout</h1>
        </div>
    )
}

export async function getServerSideProps(Context) {
    db.connectDb();
    const session = await getSession(Context);
    const user = await User.findById(session.user.id);
    const cart = await Cart.findOne({ user: user._id });
    db.disconnectDb();

    if (!cart)
    {
        return {
            redirect: "/cart",
        }
    }

    return {
        props: {
            cart: JSON.parse(JSON.stringify(cart)),
        },
    }
}