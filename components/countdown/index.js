import styles from "./styles.module.scss";
import { useState, useEffect } from 'react';
import { calculateDiff } from "./utils";

const remainingTime = {
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
};

export default function Countdown({ date }) {
    const [timestampMs, setTimestampMs] = useState(date.getTime());
    const [timeLeft, setTimeLeft] = useState();
    console.log("remaining", timeLeft);
    useEffect(() => {
        setTimestampMs(date.getTime());
    }, [date]);
    useEffect(() => {
            const interval = setInterval(() => {
                updateTimeLeft(timestampMs);
            }, 1000);
            return () => clearInterval(interval);
    }, [timestampMs]);
    const updateTimeLeft = (timestampMs) => {
        setTimeLeft(calculateDiff(timestampMs));
    };
    return (
        <div className={styles.countdown}>
            {
                [...Array(timeLeft?.days.length).keys()].map((d, i) => (
                    // eslint-disable-next-line react/jsx-key
                    <span>{timeLeft?.days.slice(i, i + 1)}</span>
                ))
            }
            <b>:</b>
            <span>4</span>
            <span>5</span>
            <b>:</b>
            <span>1</span>
            <span>0</span>
            <b>:</b>
            <span>1</span>
            <span>0</span>
        </div>
    );
}