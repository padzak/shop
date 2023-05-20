import styles from './styles.module.scss';

export default function Payments() {
    return (
        <div className={styles.footer__payments}> 
            <h3>WE ACCEPT</h3>
            <div className={styles.footer__flexwrap}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/640px-Visa_2021.svg.png" alt="visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1544px-Mastercard-logo.svg.png?20210817144358" alt="mastercard" />
                <img src="https://www.telepolis.pl/images/articles/motorla-moto-z3-play/logo_blik.png" alt="blik" />
            </div>
        </div>
    )
}