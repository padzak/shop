import styles from './styles.module.scss';

export default function NewsLetter() {
     return (
        <div className={styles.footer__newsletter}>
            <h3>SIGN UP FOR OUR NEWSLETTER</h3>
            <div className={styles.footer__flex}>
                <input type="text" placeholder="Your email address"/>
                <button className={styles.btn_primary}>Subscribe</button>
            </div>
            <p>
                By clicking the SUBSCRIBE button, you are agreeing to {" "}
                <a href="">our Privacy Policy</a>, <a href="">Cookie Policy</a> and <a href="">Terms of Use</a>.  
            </p>
        </div> 
     )
}