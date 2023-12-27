import styles from './styles.module.scss';
import { Rating } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react';
import { BsHandbagFill, BsHeart } from 'react-icons/bs';
import { TbMinus, TbPlus } from 'react-icons/tb';
import Share from './share';
import InfosAccordion from './InfosAccordion';
import SimilarSwiper from './SimilarSwiper';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCart } from '@/store/cartSlice';

export default function Infos({ product, setActiveImage }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [size, setSize] = useState(router.query.size);
    const [qty, setQty] = useState(1);
    const [error, setError] = useState("");
    const { cart } = useSelector((state) => ({ ...state }));
    useEffect(() => {
        setSize("");
        setQty(1);
    }, [router.query.style]);
    useEffect(() => {
        if (qty > product.quantity) {
            setQty(product.quantity);
        }
    }, [router.query.size]);
    const addToCartHandler = async () => {
        if (!router.query.size) {
            setError("Please Select a size");
            return;
        }
        const { data } = await axios.get(
            `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
        );
        if (qty > data.quantity) {
            setError(
                "The Quantity you have chosen is more than in stock. Try and lower the Qty"
            );
        } else if (data.quantity < 1) {
            setError("This Product is out of stock.");
            return;
        } else {
            // Generate a unique id for the product combining the product id, style and size
            // referring to _id for data structure safety - it is represented in the DB like that
            let _uid = `${data._id}_${product.style}_${router.query.size}`;
            let exist = cart.cartItems.find((p) => p._uid === _uid);
            if (exist) {
                let newCart = cart.cartItems.map((p) => {
                    if (p._uid == exist._uid) {
                        // Quantity of a specific product is updated here - quantity is overwritten with the newly provided number
                        return { ...p, qty: qty };
                    }
                return p;
                });
                dispatch(updateCart(newCart));
            } else {
                dispatch(
                addToCart({
                    ...data,
                    qty,
                    size: data.size,
                    _uid,
                })
              );
            }
        }
    };
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
                    ({product.numReviews} {
                        product.numReviews > 1 ? "reviews" : "review"
                    })
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
                <div className={styles.infos__colors}>
                    {
                        product.colors && product.colors.map((color, index) => (
                            <span 
                                className={`
                                    ${index == router.query.style ? styles.active_color : ""}
                                `}
                                onMouseOver={() => setActiveImage(product.subProducts[index].images[0].url)} // TODO a fix here is needed, as the active image is not updating on mouse over / mouse leave
                                onMouseLeave={() => setActiveImage("")}
                                key={index}
                            >
                                <Link
                                    href={`/product/${product.slug}?style=${index}`}
                                >
                                    <img src={color.image} alt={product.name} />
                                </Link>
                            </span>
                        ))
                    }
                </div>
                <div className={styles.infos__qty}>
                    <button
                        onClick={() => {
                            qty > 1 && setQty((prev) => prev - 1)
                        }}
                    >
                        <TbMinus />
                    </button>
                    <span>{qty}</span>
                    <button
                        onClick={() => {
                            qty < product.quantity && setQty((prev) => prev + 1)
                        }}
                    >
                        <TbPlus />
                    </button>
                </div>
                <div className={styles.infos__actions}>
                        <button
                            disabled={product.quantity < 1}
                            style={{
                                cursor: `${product.quantity < 1 ? "not-allowed" : "pointer"}}`
                            }}
                            onClick={() => addToCartHandler()}
                        >
                            <BsHandbagFill />
                            <b>Add to Cart</b>
                        </button>
                        <button>
                            <BsHeart />
                            <b>Add to Wishlist</b>
                        </button>
                </div>
                {
                    error && <span className={styles.error}>{error}</span>
                }
                <Share />
                <InfosAccordion details={[product.description, ...product.details]} />
                <SimilarSwiper />
            </div>
        </div>
    );
}