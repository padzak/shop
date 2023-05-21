import styles from './styles.module.scss';
import { BiUser } from 'react-icons/bi';
import { SiMinutemailer } from 'react-icons/si';
import { VscKey } from 'react-icons/vsc';
import { ErrorMessage, useField } from 'formik';

export default function LoginInput({ icon, placeholder, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div className={`${styles.input} ${
            meta.touched && meta.error ? styles.error : ""
            }`}>
            {
                icon == "user" ? ( 
                    <BiUser />
                ) : icon == "email" ? (
                    <SiMinutemailer />
                ) : icon == "password" ? (
                    <VscKey />
                ) : ""
            }
            <input 
                type={field.type} 
                name={field.name}
                placeholder={placeholder} 
                {...field}
                {...props}
            />
            {
                meta.error && meta.touched && <div className={styles.error__message}>
                    <span> </span>
                    <ErrorMessage name={field.name} />
                    </div>
            }
        </div>
    );
}