import styles from "./styles.module.scss";
import TableSelect from "./TableSelect";
import { useState } from "react";

export default function TableHeader({ reviews, allSizes }) {
    const [rating, setRating] = useState();
    const [size, setSize] = useState();

    return (
        <div className={styles.table__header}>
        <TableSelect
            property={rating}
            text="Rating"
            data={ratings.filter((x) => x.value !== rating)}
            handleChange={setRating}
        />
        <TableSelect
            property={size}
            text="Size"
            data={allSizes.filter((x) => x.size !== size)}
            handleChange={setSize}
        />
        </div>  
    );
}

const ratings = [
    {
        text: "5 star",
        value: 5,
    },
    {
        text: "4 star",
        value: 4,
    },
    {
        text: "3 star",
        value: 3,
    },
    {
        text: "2 star",
        value: 2,
    },
    {
        text: "1 star",
        value: 1,
    },
];