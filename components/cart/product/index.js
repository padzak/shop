import styles from "./styles.module.scss";
import { storeImg } from "@/data/links";
import { AiOutlineDelete } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "@/store/cartSlice";
import { useEffect, useState } from "react";

export default function Product({ product, selected, setSelected }) {
  const { cart } = useSelector((state) => ({ ...state }));
  const [active, setActive] = useState(false);
  useEffect(() => {
    const check = selected.find((item) => item._uid == product._uid);
    setActive(check);
  }, [product._uid, selected]);
  const dispatch = useDispatch();
  const updateQty = (type) => {
    let newCart = cart.cartItems.map((item) => {
      if (item._uid == product._uid) {
        return {
          ...item,
          qty: type == "minus" ? item.qty - 1 : item.qty + 1,
        };
      }
      return item;
    });
    dispatch(updateCart(newCart));
  };
  const removeProduct = (id) => {
    let newCart = cart.cartItems.filter((item) => {
      return item._uid != id;
    });
    dispatch(updateCart(newCart));
  };
  const handleSelected = () => {
    if (active) {
      setSelected(selected.filter((item) => item._uid !== product._uid));
    }
    else {
      setSelected([...selected, product]);
    }
  };
  return (
    <>
      <div className={`${styles.card} ${styles.product}`}>
        {product.quantity < 1 && <div className={styles.blur}></div>}
        <div className={styles.product__header}>
          <img src={storeImg} alt="store" />
          OFFICIAL STORE
        </div>
        <div className={styles.product__image}>
          <div className={`${styles.checkbox} ${active ? styles.active : ""}`} onClick={() => handleSelected()}></div>
          <img src={product.images[0].url} alt="" />
          <div className={styles.col}>
            <div className={styles.grid}>
              <h1>
                {product.name.length > 30
                  ? `${product.name.substring(0, 30)}...`
                  : product.name}
              </h1>
              <div style={{ zIndex: "2" }}>
                <BsHeart />
              </div>
              <div
                style={{ zIndex: "2" }}
                onClick={() => removeProduct(product._uid)}
              >
                <AiOutlineDelete />
              </div>
            </div>
            <div className={styles.product__style}>
              <img src={product.color.image} alt="" />
              {product.size && <span>{product.size}</span>}
              {product.price && <span>{product.price.toFixed(2)}</span>}
              <MdOutlineKeyboardArrowRight />
            </div>
            <div className={styles.product__priceQty}>
              <div className={styles.product__priceQty_price}>
                <span className={styles.price}>
                  {product.price.toFixed(2) * product.qty} PLN
                </span>
                {product.price !== product.priceBefore && (
                  <span className={styles.priceBefore}>
                    {product.priceBefore.toFixed(2)} PLN
                  </span>
                )}
                {product.discount > 0 && (
                  <span className={styles.discount}> -{product.discount}%</span>
                )}
              </div>
              <div className={styles.product__priceQty_qty}>
                <button disabled={product.qty < 2} onClick={() => updateQty("minus")}>-</button>
                <span>{product.qty}</span>
                <button disabled={product.qty == product.quantity} onClick={() => updateQty("plus")}>+</button>
              </div>
              <div className={styles.product__shipping}>
                {product.shipping
                  ? `Shipping: ${product.shipping} PLN`
                  : `Free Shipping`}
              </div>
              {product.quantity < 1 && (
                <div className={styles.notAvailable}>
                  Out of stock. Add to your wishist to get notified when it's
                  back.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
