import React from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { logo } from "@/data/links";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Main({ searchHandler }) {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search || "");
  const cart = useSelector((state) => ({ ...state }));
  const handleSearch = (e) => {
    e.preventDefault();
    if (router.pathname !== "/browse") {
      if (query.length > 1) {
        router.push(`/browse?search=${query}`);
      }
    } else {
      searchHandler(query);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link legacyBehavior href="/">
          <a className={styles.logo}>
            <img src={logo} />
          </a>
        </Link>
        <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line />
          </button>
        </form>
        <Link legacyBehavior href="/cart">
          <a className={styles.cart}>
            <FaOpencart />
            <span style={{ color: "black" }}>{0}</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
