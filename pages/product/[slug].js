import Head from 'next/head';
import styles from '../../styles/product.module.scss'
import db from '../../utils/db'
import Product from '@/models/Product';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Category from '@/models/Category';

export default function product({ product }) {
    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <Header country=""/>
            <div className={styles.product}>
                <div className={styles.product__container}>
                    <div className={styles.path}>
                        Home / {product.category.name}
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
    };
    // ------------
    db.disconnectDb();

    return {
        props: {
            product: JSON.parse(JSON.stringify(newProduct)),
        },
    }
}
