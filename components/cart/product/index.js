import styles from "./styles.module.scss";
import { storeImg } from "@/data/links";
import { AiOutlineDelete } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";

export default function Product({ product }) {
    return (
        <>
            <div className={`${styles.card} ${styles.product}`}>
                {product.quantity < 1 && <div className={styles.blur}></div>}
                <div className={styles.product__header}>
                    <img src={storeImg} alt="store" />
                    OFFICIAL STORE
                </div>
                <div className={styles.product__image}>
                    <div className={styles.checkbox}></div>
                    <img src={product.images[0].url} alt=""/>
                    <div className={styles.col}>
                        <div className={styles.grid}>
                            <h1>
                                {
                                    product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name
                                }
                            </h1>
                            <div style={{ zIndex:'2'}}>
                                <BsHeart />
                            </div>
                            <div style={{ zIndex:'2'}}>
                                <AiOutlineDelete />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}