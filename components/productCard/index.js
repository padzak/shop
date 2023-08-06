import styles from './styles.module.scss';
import { useState } from 'react';

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
    console.log("Prices", prices);
    return (
        <div>index</div>
    );
}