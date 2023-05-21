import Footer from '@/components/footer';
import Header from '@/components/header';
import styles from '@/styles/signin.module.scss';
import { BiLeftArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import LoginInput from '@/components/inputs/loginInput';
import { useState } from 'react';
import * as Yup from 'yup';

const initialValues = {
    login_email: "",
    login_password: "",
}

export default function signin({ country }) {
    const [user, setUser] = useState(initialValues);
    const { login_email, login_password } = user;
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }
    const loginValidation = Yup.object({
        login_email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        login_password: Yup.string()
            .required("Enter a password"),
    });
    return (
        <>
            <Header country="Poland"/>
            <div className={styles.login}>
                <div className={styles.login__container}>
                    <div className={styles.login__header}>
                        <div className={styles.back__svg}>
                            <BiLeftArrowAlt />
                        </div>
                        <span>
                            Join us! <Link href="">Go to Store</Link>
                        </span>
                    </div>
                    <div className={styles.login__form}>
                        <h1>Sign in</h1>
                        <p>
                            Get full access to our shopping platform. 
                        </p>
                        <Formik
                            enableReinitialize
                            initialValues = {{
                                login_email,
                                login_password,
                            }}
                            validationSchema={loginValidation}
                        >
                            {
                                (form) => (
                                    <Form>
                                        <LoginInput 
                                            type="text"
                                            name="login_email"
                                            icon="email" placeholder="Email Address" 
                                            onChange={handleChange}
                                        />
                                        <LoginInput 
                                            type="password"
                                            name="login_password"
                                            icon="password" placeholder="Password" 
                                            onChange={handleChange}
                                        />                                        
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
            </div>
            <Footer country="Poland"/>
        </>
    );
}