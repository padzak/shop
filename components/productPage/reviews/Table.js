import { Pagination } from "@mui/material";
import { useState } from "react";
import usePagination from "./Pagination";
import styles from "./styles.module.scss";

export default function Table({ reviews, allSizes, colors }) {
  const [page, setPage] = useState(1);
  const PER_PAGE = 3;
  const count = Math.ceil(reviews.length / PER_PAGE);
  const _DATA = usePagination(reviews, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <div className={styles.table}>
        <div className={styles.table__header}></div>  
        <div className={styles.table__data}>
            {_DATA.currentData().map((review, index) => (
                <span key={index}>{review.review}</span>
            ))}
        </div>
    </div>
  );
}
