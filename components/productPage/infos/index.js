import styles from './styles.module.scss';
import { Rating } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Infos({ product }) {
    const router = useRouter();
    const [size, setSize] = useState(router.query.size);
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
                    {
                        !size
                        ? (
                            <h2>{product.priceRange}</h2>
                        ) : (
                            <h1>{product.price}</h1>
                        )
                    }
                    {
                        product.discount > 0 ? (
                            <h3>
                                <span>30-day lowest price: {product.priceBefore}</span>
                                <span>(-{product.discount}%)</span>
                            </h3>
                        ) : (
                            ""
                        )
                    }
                </div>
                <span className={styles.infos__shipping}>
                    {
                        product.shipping
                        ? (
                            `+${product.shipping} PLN shipping fee`
                        ) : (
                            "Free shipping"
                        )
                    }
                </span>
                <span>
                    {
                        size
                        ? (
                            product.quantity
                        ) : (
                            product.sizes.reduce((start, next) => start + next.qty, 0)
                        )
                    } items available.
                </span>
                <div className={styles.infos__sizes}>
                    <h4>Select a size: </h4>
                    <div className={styles.infos__sizes_wrap}>
                        {
                            product.sizes.map((size, index) => (
                                <Link
                                    href={`/product/${product.slug}?style=${router.query.style}&size=${index}`}
                                    key={index}
                                >
                                    <div
                                        className={`
                                            ${styles.infos__sizes_size}
                                            ${index == router.query.size && styles.active_size}
                                        `}
                                        onClick={() => setSize(size.size)}
                                    >
                                        {size.size}
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}