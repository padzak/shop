import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductSwiper from './ProductSwiper';

export default function ProductCard({ product }) {
    const [active, setActive] = useState(0);
    const [images, setImages] = useState(product.subProducts[active]?.images);
    const [prices, setPrices] = useState((
        product.subProducts[active]?.sizes
        ?.map((size) => { 
            return size.price; 
        }))
        ?.sort((a,b) => {
            return a - b;
        })
    );
    const [styless, setStyless] = useState(product.subProducts.map((product) => {
        return product.color;
    }));
    useEffect(() => {
        setImages(product.subProducts[active]?.images);
        setPrices(
            product.subProducts[active]?.sizes
            ?.map((size) => {
                return size.price;
            })
            ?.sort((a,b) => {
                return a - b;
            })
        );
    }, [active]);
    console.log(images, prices, styless);
    return (
        <div className={styles.product}>
            <div className={styles.product__container}>
                <Link href={`/product/${product.slug}?style${active}`}>
                    <div>
                        <ProductSwiper images={images} />
                    </div>
                </Link>
                {
                    product.subProducts[active].discount && (
                    <div className={styles.product__discount}>
                        {product.subProducts[active].discount}%
                    </div>
                )}
                <div className={styles.product__infos}>
                    <h1>{ product.name.length > 45 ? `${product.name.substring(0,45)}...` : product.name }</h1>
                    <span>
                        {
                            prices.length===1 ? 
                                `${prices[0]} PLN` : 
                                `${prices[0]} - ${prices[prices.length - 1]} PLN`
                        }
                    </span>
                    <div className={styles.product__colors}>
                        {
                            styless && styless.map((style, i) => 
                                styles.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img 
                                    src={styles.image}
                                    className={i == active && styles.active}
                                    onMouseOver={() => {
                                        setImages(product.subProducts[i].images);
                                        setActive(i);
                                    }}
                                    alt=""
                                    key={i}
                                />
                            ) : (
                                <span 
                                    style={{ backgroundCOlor: `${style.color}` }}
                                    key={i}
                                    onMouseOver={() => {
                                        setImages(product.subProducts[i].images);
                                        setActive(i);
                                    }}
                                >

                                </span>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}