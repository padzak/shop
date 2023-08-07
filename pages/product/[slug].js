import styles from '../../styles/product.module.scss'
import db from '../../utils/db'

export default function product() {
    return (
        <div>[SLUG]</div>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const slug = query.slug;
    const style = query.style;
    const size = query.size || 0;



    return {
        props: {

        },
    }
}
