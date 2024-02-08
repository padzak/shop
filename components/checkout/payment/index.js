import { paymentMethods } from "@/data/paymentMethods";
import styles from "./styles.module.scss";

export default function Payment({ paymentMethod, setPaymentMethod }) {
  return (
    <div className={styles.payment}>
      <div className={styles.header}>
        <h3>Payment Method</h3>
      </div>
      {paymentMethods.map((method) => (
        <label
          htmlFor={method.id}
          key={method.id}
          className={styles.payment__item}
          onClick={() => setPaymentMethod(method.id)}
          style={{ background: `${paymentMethod == method.id && "#eee"}` }}
        >
          <input
            type="radio"
            name="payment"
            id={method.id}
            checked={paymentMethod == method.id}
          />
          <img
            src={`../../../images/checkout/${method.id}.webp`}
            alt={method.name}
          />
          <div className={styles.payment__item_col}>
            <span>Pay with {method.name}</span>
            <p>
              {method.images.length > 0
                ? method.images.map((img) => (
                    <img
                      key={img}
                      src={`../../../images/payment/${img}.webp`}
                      alt=""
                    />
                  ))
                : method.description}
            </p>
          </div>
        </label>
      ))}
    </div>
  );
}
