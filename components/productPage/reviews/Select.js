import styles from './styles.module.scss';
import { IoArrowDown } from 'react-icons/io5';
import { useState } from 'react';

export default function Select({ property, text, data, handleChange }) {
    const [visible, setVisible] = useState(false);
    console.log("Data", data)
    return (
        <div className={styles.select}>
            <div
                className={styles.select__header}
                onMouseOver={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
            <span 
                className={`${styles.flex} ${styles.select__header_wrap}`} 
                style={{ padding: "0 5px"}}
            >
                {
                    property || `Select ${text}`
                }
                <IoArrowDown />
            </span>
            {
                visible &&
                <ul
                    className={styles.select__header_menu}
                    onMouseOver={() => setVisible(true)}
                    onMouseLeave={() => setVisible(false)}
                >
                    {
                        data.map((item, index) => {
                            if (text == "Size") {
                                return (
                                    <li key={index} onClick={() => handleChange(item.size)}>
                                        <span>{item.size}</span>
                                    </li>
                                );
                            }
                            if (text == "Style") {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => handleChange(item)}
                                        style={{
                                            background: `${item.color}`,
                                        }}
                                    >
                                        <span>
                                            <img src={item.image} alt="" />
                                        </span>
                                    </li>
                                );
                            }
                        })
                    }
                </ul>
            }
        </div>
        </div>
    );
}