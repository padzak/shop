import styles from "./styles.module.scss";
import { BsArrowRightCircle } from 'react-icons/bs';
import { useMediaQuery } from "react-responsive";

export default function Category({ header, products, background }) {
    const isMedium = useMediaQuery({ query: "(max-width: 1300px)" });
    return (
        <div className={styles.category} style={{ background: `${background}`}}>
            <div className={styles.category__header}>
                <h1>{header}</h1>
                <BsArrowRightCircle />
            </div>
            <div className={styles.category__products}>
                {
                    products.slice(0, isMedium ? 4 : 6).map((product, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className={styles.product}>
                            <img src={product.image} /*alt={product.name}*/ alt="" />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}