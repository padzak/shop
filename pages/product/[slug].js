import Head from 'next/head';
import styles from '../../styles/product.module.scss'
import db from '../../utils/db'
import Product from '@/models/Product';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Category from '@/models/Category';
import SubCategory from '@/models/SubCategory';
import MainSwiper from '@/components/productPage/mainSwiper';
import { useState } from 'react';
import Infos from '@/components/productPage/infos';

export default function product({ product }) {
    const [activeImage, setActiveImage] = useState("");
    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <Header country=""/>
            <div className={styles.product}>
                <div className={styles.container}>
                    <div className={styles.path}>
                        Home / {product.category.name}
                        {
                            product.subCategories.map((subCategory) => {
                                <span> / {subCategory.name}</span>
                            })
                        }
                    </div>
                    <div className={styles.product__ml}>
                        <MainSwiper images={product.images} activeImage={activeImage} />
                        <Infos product={product} setActiveImage={setActiveImage} />
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const slug = query.slug;
    const style = query.style;
    const size = query.size || 0;

console.log("product", slug, style, size);
    db.connectDb();
    // ------------
    let product = await Product.findOne({ slug })
        .populate({path: 'category', model: Category})
        .populate({path: 'subCategories._id', model: SubCategory})
        .lean();
    let subProduct = product.subProducts[style];
    let prices = subProduct?.sizes
    .map((size) => {
        return size.price;
    })
    .sort((a, b) => {
        return a - b;
    });
    let newProduct = {
        ...product,
        images: subProduct?.images,
        sizes: subProduct?.sizes,
        discount: subProduct?.discount,
        sku: subProduct.sku,
        colors: product.subProducts.map((subProduct) => {
            return subProduct.color;
        }),
        priceRange: prices?.length > 1
        ? `From ${prices[0]} to ${prices[prices.length - 1]}`
        : '',
        price: subProduct.discount > 0
        ? (subProduct.sizes[size].price - (subProduct.sizes[size].price * subProduct.discount / 100)).toFixed(2)
        : subProduct.sizes[size].price.toFixed(2),
        priceBefore: subProduct.sizes[size].price,
        quantity: subProduct.sizes[size].qty,
        ratings: [
            {
              percentage: calculatePercentage("5"),
            },
            {
              percentage: calculatePercentage("4"),
            },
            {
              percentage: calculatePercentage("3"),
            },
            {
              percentage: calculatePercentage("2"),
            },
            {
              percentage: calculatePercentage("1"),
            },
          ],
          reviews: product.reviews.reverse(),
          allSizes: product.subProducts
            .map((p) => {
              return p.sizes;
            })
            .flat()
            .sort((a, b) => {
              return a.size - b.size;
            })
            .filter(
              (element, index, array) =>
                array.findIndex((el2) => el2.size === element.size) === index
            ),
    };
    // ------------
    function calculatePercentage(num) {
        return (
            (product.reviews.reduce((a, review) => {
            return (
                a +
                (review.rating == Number(num) || review.rating == Number(num) + 0.5)
            );
            }, 0) *
            100) /
            product.reviews.length
        ).toFixed(1);
    };
    db.disconnectDb();

    return {
        props: {
            product: JSON.parse(JSON.stringify(newProduct)),
        },
    }
}
