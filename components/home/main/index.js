import Menu from './menu';
import Offers from './Offers';
import styles from './styles.module.scss'
import MainSwiper from './Swiper';

export default function Main() {
    return (
      <div className={styles.main}>
        <div className={styles.header}>header</div>
        <Menu />
        <div className={styles.swiper}>
          <MainSwiper />
        </div>
        <Offers />
        <div className={styles.user}>user</div>
      </div>
    );
}

  