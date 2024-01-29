import React from "react";
import styles from "../styles/checkout.module.scss";
import { getSession } from "next-auth/react";

export default function checkout() {
    return (
        <div>
            <h1>Checkout</h1>
        </div>
    )
}

export async function getServerSideProps(Context) {
    const session = await getSession(Context);

    return {
        props: {},
    }
}