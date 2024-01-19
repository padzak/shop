import styles from "./styles.module.scss";

export default function Checkout({ subtotal, shippingFee, total, selected }) {
    return(
        <>
            <div className={`${styles.cart__checkout} ${styles.card}`}>
                <h2>Order summary</h2>
            </div>  
        </>
    );
}