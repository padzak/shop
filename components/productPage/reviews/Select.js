import styles from './styles.module.scss';
import { IoArrowDown } from 'react-icons/io5';
import { useState } from 'react';

export default function Select({ property, text }) {
    const [visible, setVisible] = useState(true);
    return (
        <div className={styles.select__header}>
            <span className="flex" style={{ padding: "0 5px"}}>
                {
                    property || `Select ${text}`
                }
                <IoArrowDown />
            </span>
            {
                visible && <ul className={styles.select__menu}>
                    
                </ul>
            }
        </div>
    );
}