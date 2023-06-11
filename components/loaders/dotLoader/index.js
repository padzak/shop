import styles from './style.module.scss';
import DotLoader from "react-spinners/DotLoader";

export default function DotSpinner({ loading }) {
    return (
        <div className={styles.loader}>
            <DotLoader color="#2f82ff" loading={loading} />
        </div>
    )
}