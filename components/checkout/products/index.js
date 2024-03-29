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
              <div className={styles.product__infos}>
                <img src={product.color.image} alt={product.color.color} />
                <span>{product.size}</span>
                <span>x{product.qty}</span>
              </div>
            </div>
            <div className={styles.product__name}>
                { product.name.length > 18 ? product.name.slice(0, 18) + "..." : product.name}
            </div>
            <div className={styles.product__price}>
                {
                    (product.price * product.qty).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    })
                }
            </div>
          </div>
        ))}
        <div className={styles.products__total}>
                Subtotal: <b>{(cart.cartTotal).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    })}</b>
        </div>
      </div>
    </div>
  );
}
