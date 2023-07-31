import styles from "./styles.module.scss";
import { useState, useEffect } from 'react';

const remainingTime = {
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
};

export default function Countdown({ date }) {
    const [timestampMs, setTimestampMs] = useState(date.getTime());
    useEffect(() => {
        setTimestampMs(date.getTime());
    }, [date]);
    const [timeLeft, setTimeLeft] = useState();
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
            <span>1</span>
            <span>2</span>
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