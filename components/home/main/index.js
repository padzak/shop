import Menu from './Menu';
import Offers from './Offers';
import styles from './styles.module.scss'
import MainSwiper from './Swiper';
import User from './User';

export default function Main() {
    return (
      <div className={styles.main}>
        <div className={styles.header}>header</div>
        <Menu />
        <div className={styles.swiper}>
          <MainSwiper />
        </div>
        <Offers />
        <User />
      </div>
    );
}

  