import Offers from './offers';
import styles from './styles.module.scss'
import MainSwiper from './swiper';

export default function Main() {
    return (
      <div className={styles.main}>
        <div className={styles.header}>header</div>
        <div className={styles.menu}>menu</div>
        <div className={styles.swiper}>
          <MainSwiper />
        </div>
        <Offers />
        <div className={styles.user}>user</div>
      </div>
    );
}

  