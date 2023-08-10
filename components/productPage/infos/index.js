import styles from './styles.module.scss';
import { Rating } from '@mui/material';

export default function Infos({ product }) {
    return (
        <div className={styles.infos}>
            <div className={styles.infos__container}>
                <h1 className={styles.infos__name}>{product.name}</h1>
                <h2 className={styles.infos__sku}>{product.name}</h2>
                <div className={styles.infos__rating}>
                    <Rating 
                        name="half-rating-read"
                        defaultValue={product.rating}
                        precision={0.5}
                        readOnly
                        style={{ color: "#FACF19"}}
                    />
                    {product.numReviews} {
                        product.numReviews > 1 ? "reviews" : "review"
                    }
                </div>
                <div className={styles.infos__price}>
                
                </div>
            </div>
        </div>
    );
}