import { FaStaylinked } from "react-icons/fa";
import styles from "./styles.module.scss";

export default function Products({ cart }) {
  return (
    <div className={styles.products}>
      <div className={styles.products__header}>
        <h1>Cart</h1>
        <span>
          {cart.products.length == 1
            ? "1 item"
            : `${cart.products.length} products`}
        </span>
      </div>
      <div className={FaStaylinked.products__wrap}>
        {cart.products.map((product) => (
          <div className={styles} key={product._id}>
            <div className={styles.product__img}>
              <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.product__infos}>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
