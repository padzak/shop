import styles from '@/styles/forgot.module.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { BiLeftArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import LoginInput from '@/components/inputs/loginInput';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import * as Yup from 'yup';
import axios from 'axios';
import CircleBtn from '@/components/buttons/circleBtn';
import DotSpinner from '@/components/loaders/dotLoader';
import jwt from 'jsonwebtoken';
import Router from 'next/router';

export default function Reset({ user_id }) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState("");

    const passwordValidation = Yup.object({
        password: Yup.string()
            .required("Enter your new password")
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .max(20, 'Password is too long - should be 20 chars maximum.')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
        confirmPassword: Yup.string()
            .required("Confirm your password")
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });
    const resetHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put('/api/auth/reset', {
                user_id,
                password,
            });
            let options = {
                redirect: false,
                email: data.email,
                password: password,
            };
            await signIn("credentials", options);
            Router.push("/");
            setError("");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setSuccess("");
            setError(error.response.data ? error.response.data.message : error.message);
        }
    };
    return (
        <>
            {
                loading && <DotSpinner loading={loading} />
            }
            <Header country=""/>
            <div className={styles.forgot}>
                <div>
                    <div className={styles.forgot__header}>
                        <div className={styles.back__svg}>
                            <BiLeftArrowAlt />
                        </div>
                        <span>
                            Reset your password <Link href="/">Login instead</Link>
                        </span>
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues = {{
                            password,
                            confirmPassword,
                        }}
                        validationSchema={passwordValidation}
                        onSubmit = {() => {                    
                            resetHandler();
                        }}
                    >
                        {(form) => (
                            <Form >
                                <LoginInput
                                    type="password"
                                    name="password"
                                    icon="password" placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <LoginInput
                                    type="password"
                                    name="confirmPassword"
                                    icon="password" placeholder="Confirm Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <CircleBtn type="submit" text="Submit" />
                            <div className={styles.forgot__result}>
                                { error && <span className={styles.error}>{error}</span> }
                                { success && <span className={styles.success}>{success}</span> }
                            </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <Footer country=""/>
        </>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const token = query.token;
    const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    return {
        props: { user_id: user_id.id, }
    }
}