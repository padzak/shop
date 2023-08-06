import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

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
        <div>index</div>
    );
}