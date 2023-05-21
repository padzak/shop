import Footer from '@/components/footer';
import Header from '@/components/header';
import styles from '@/styles/signin.module.scss';
import { BiLeftArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import LoginInput from '@/components/inputs/loginInput';

export default function signin({ country }) {
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
                        <Formik>
                            {
                                (form) => (
                                    <Form>
                                        <LoginInput icon="email" placeholder="Email Address" />
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