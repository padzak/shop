import styles from "./styles.module.scss";
import { BiCategory } from "react-icons/bi";
import Link from "next/link";
import { menuList } from "../../../data/home";
import { GiLargeDress, GiClothes, GiShirt } from "react-icons/gi";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <ul>
        <li className={styles.menu__header}>
          <a className={styles.menu__header}>
            <BiCategory />
            <b>Categories</b>
          </a>
        </li>
        <div className={styles.menu__list}>
          {menuList.map((item, i) => (
            <li key={i} className={styles.menu__list}>
              <Link href={item.link}>
                {i == 0 ? <GiLargeDress /> : i == 1 ? <GiClothes /> : ""}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
