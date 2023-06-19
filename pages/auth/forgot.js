import styles from '@/styles/forgot.module.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { BiLeftArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import LoginInput from '@/components/inputs/loginInput';
import { useState } from 'react';
import * as Yup from 'yup';
import CircleBtn from '@/components/buttons/circleBtn';

export default function Forgot() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const emailValidation = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
    });
    const forgotHandler = async () => {

    };
    return (
        <>
            <Header country=""/>
            <div className={styles.forgot}>forgot
                <div>
                    <div className={styles.forgot__header}>
                        <div className={styles.back__svg}>
                            <BiLeftArrowAlt />
                        </div>
                        <span>
                            Forgot your password? <Link href="/">Login instead</Link>
                        </span>
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues = {{
                            email,
                        }}
                        validationSchema={emailValidation}
                        onSubmit = {() => {                    
                            forgotHandler();
                        }}
                    >
                        {(form) => (
                            <Form >
                                <LoginInput
                                    type="text"
                                    name="email"
                                    icon="email" placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <CircleBtn type="submit" text="Sign in" />
                                {
                                    error && <span className={styles.error}>{error}</span>
                                }

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <Footer country=""/>
        </>
    );
}