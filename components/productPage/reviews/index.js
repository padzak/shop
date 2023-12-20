import { Rating } from '@mui/material';
import styles from './styles.module.scss';
import { useSession, signIn } from 'next-auth/react';
import AddReview from './AddReview';
import Table from './Table';

export default function Reviews({ product }) {
    const { data: session } = useSession();
    return (
        <div className={styles.reviews}>
            <div className={styles.reviews__container}>
                <h1>Customer Reviews ({ product.reviews.length })</h1>
                <div className={styles.reviews__stats}>
                    <div className={styles.reviews__stats_overview}>
                        <span>Average Rating</span>
                        <div className={styles.reviews__stats_overview_rating}></div>
                        <Rating 
                            name="half-rating-read"
                            defaultValue={product.rating}
                            precision={0.5}
                            readOnly
                            style={{
                                color: "#FACF19",
                            }}
                        />
                        {product.rating == 0 ? "No reviews yet" : product.rating}
                    </div>
                    <div className={styles.reviews__stats_reviews}>
                        {
                            product.ratings.map((rating, index) => (
                                <div className={styles.reviews__stats_review_rating} key={index}>
                                    <Rating 
                                        name="half-rating-read"
                                        defaultValue={5 - index}
                                        precision={0.5}
                                        readOnly
                                        style={{
                                            color: "#FACF19",
                                        }}
                                    />
                                    <div className={styles.bar}>
                                        <div
                                            className={styles.bar__inner}
                                            style={{ 
                                                width: `${rating.percentage}%` 
                                            }}
                                        ></div>
                                    </div>
                                    <span>{rating.percentage}%</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {
                    session
                    ? (
                        <AddReview product={product} />
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className={styles.login_btn}
                        >
                            Login to add a review
                        </button>
                    )
                }
                <Table reviews={product.reviews} allSizes={product.allSizes}/>
            </div>
        </div>
    );
}