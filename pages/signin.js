import Footer from '@/components/footer';
import Header from '@/components/header';
import styles from '@/styles/signin.module.scss';
import { BiLeftArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import LoginInput from '@/components/inputs/loginInput';
import { useState } from 'react';
import * as Yup from 'yup';
import CircleBtn from '@/components/buttons/circleBtn';
import { getProviders, signIn } from 'next-auth/react';
import axios from 'axios';
import DotSpinner from '@/components/loaders/dotLoader';
import Router from 'next/router';
import { getSession, getCsrfToken } from 'next-auth/react';

const initialValues = {
    login_email: "",
    login_password: "",
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    success: "",
    error: "",
    login_error: "",
}

export default function Signin({ providers, callbackUrl, csrfToken }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(initialValues);
    const { login_email, 
            login_password,
            name,
            password,
            confirm_password,
            email,
            success,
            error,
            login_error,
        } = user;
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
    const registerValidation = Yup.object({
        name: Yup.string()
            .required("Please enter your full name")
            .min(2, 'First name is too short - should be 2 chars minimum.')
            .max(22, 'First name is too long - should be 22 chars maximum.')
            .matches(/^[A-Za-z\s\-]+$/, 'First name should contain only Latin letters.'),
        email: Yup.string()
            .required("Please enter your email")
            .email("Invalid email address"),
        password: Yup.string()
            .required("Enter a password")
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .max(20, 'Password is too long - should be 20 chars maximum.')
            .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
        confirm_password: Yup.string()
            .required("Enter a password")
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });
    const signInHandler = async() => {
        setLoading(true);
        let options = {
            redirect: false,
            email: login_email,
            password: login_password,
        };
        const res = await signIn("credentials", options);
        setUser({ ...user, success: "", error: "" });
        setLoading(false);
        if (res?.error) {
            setLoading(false);
            setUser({ ...user, login_error: res?.error });
        } else {
            return Router.push(callbackUrl || "/");
        }
    };
    const signUpHandler = async() => {
        try {
            setLoading(true);
            const { data } = await axios.post("/api/auth/signup", {
                name,
                email,
                password,
            });
            setUser({ ...user, success: data.message, error: "" });
            setLoading(false);
            setTimeout(async () => {
                let options = {
                    redirect: false,
                    email: email,
                    password: password,
                };
                const res = await signIn("credentials", options);
                Router.push("/");
            }, 1200);
        } catch (error) {
            setLoading(false);
            setUser({ ...user, success: "", error: error.response.data.message });
        }
    };
    return (
        <>
        {
            loading && <DotSpinner loading={loading} />
        }
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
                            onSubmit = {() => {                    
                                signInHandler();
                            }}
                        >
                            {(form) => (
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
                                    <CircleBtn type="submit" text="Sign in" />
                                    {
                                        login_error && <span className={styles.error}>{login_error}</span>
                                    }
                                    <div className={styles.forgot}>
                                        <Link href="/forget">Forgot Password?</Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                            <div className={styles.login__socials}>
                                <span className={styles.or}>Or continue with</span>
                               <div className={styles.login__socials_wrap}>
                               {
                                    providers.map((provider) => {
                                        if (provider.name === "Credentials") {
                                            return;
                                        } else {
                                            return (
                                                <div key={provider.name}>
                                                    <button className={styles.social__btn} onClick={() => signIn(provider.id)}>
                                                    {/* <img src={`../public/images/icons/${provider.id}.png`} /> */}
                                                    <img src="https://img.freepik.com/darmowe-ikony/szukaj_318-265146.jpg" />
                                                    Sign in with {provider.name}
                                                    </button>
                                                </div>
                                            )
                                        }
                                    })
                                }
                               </div>
                            </div>
                    </div>
                </div>
                <div className={styles.login__container}>
                    <div className={styles.login__form}>
                        <h1>Sign up</h1>
                        <p>
                            Get full access to our shopping platform. 
                        </p>
                        <Formik
                            enableReinitialize
                            initialValues = {{
                                name,
                                email,
                                password,
                                confirm_password,
                            }}
                            validationSchema={registerValidation}
                            onSubmit={() => {
                                console.log("submit")
                                signUpHandler();
                            }}
                        >
                            {
                                (form) => (
                                    <Form>
                                        <LoginInput 
                                            type="text"
                                            name="name"
                                            icon="user" placeholder="Full Name" 
                                            onChange={handleChange}
                                        />
                                        <LoginInput 
                                            type="text"
                                            name="email"
                                            icon="email" placeholder="Email Address" 
                                            onChange={handleChange}
                                        />
                                        <LoginInput 
                                            type="password"
                                            name="password"
                                            icon="password" placeholder="Password" 
                                            onChange={handleChange}
                                        />
                                        <LoginInput 
                                            type="password"
                                            name="confirm_password"
                                            icon="password" placeholder="Confirm Password" 
                                            onChange={handleChange}
                                        />  
                                        <CircleBtn type="submit" text="Sign up" />
                                    </Form>
                                )
                            }
                        </Formik>
                        <div>
                            { success && <span className={styles.success}>{success}</span> }
                            { error && <span className={styles.error}>{error}</span> }
                        </div>
                    </div>
                </div>
            </div>
            <Footer country="Poland"/>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req, query } = context;
    const session = await getSession({ req });
    const callbackUrl = query;

    if (session) {
        return {
            redirect: {
                destination: callbackUrl,
            },
        };
    }
    const csrfToken = await getCsrfToken(context);
    const providers = Object.values(await getProviders());
    return {
        props: { providers, csrfToken, callbackUrl },
    };
}