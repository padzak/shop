import { BiRightArrow } from 'react-icons/bi';
import styles from './styles.module.scss';

export default function CircleBtn({ type, text, icon }) {
    return (
        <button className={styles.button} type={type}>
            {text}
            <div className={styles.svg__wrap}>
                <BiRightArrow />
            </div>
        </button>
    );
}