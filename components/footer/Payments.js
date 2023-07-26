import styles from './styles.module.scss';
import { paymentMethodIcons } from '@/data/payments';

export default function Payments() {
    return (
        <div className={styles.footer__payments}> 
            <h3>WE ACCEPT</h3>
            <div className={styles.footer__flexwrap}>
                <img src={paymentMethodIcons.visa} alt="visa" />
                <img src={paymentMethodIcons.masterCard} alt="mastercard" />
                <img src={paymentMethodIcons.blik} alt="blik" />
            </div>
        </div>
    )
}