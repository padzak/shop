import { Pagination } from "@mui/material";
import { useState } from "react";
import usePagination from "./Pagination";
import styles from "./styles.module.scss";
import Review from "./Review";
import TableHeader from "./TableHeader";

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
      <TableHeader
        reviews={reviews}
        allSizes={[{ size: "All" }, ...allSizes]}
        colors={[{ color: "", image: "" }, ...colors]}
      />
      <div className={styles.table__data}>
        {_DATA
          .currentData()
          .reverse()
          .map((review, index) => (
            <Review review={review} key={index} />
          ))}
      </div>
      <div className={styles.pagination}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          shape="rounded"
          size="large"
        />
      </div>
    </div>
  );
}
