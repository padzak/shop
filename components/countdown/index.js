import styles from "./styles.module.scss";
import { useState, useEffect } from 'react';
import { calculateDiff } from "./countdownUtils";

const remainingTime = {
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
};

export default function Countdown({ date }) {
    const [timestampMs, setTimestampMs] = useState(date.getTime());
    const [timeLeft, setTimeLeft] = useState();
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
                    <span key={i}>{timeLeft?.days.slice(i, i + 1)}</span>
                ))
            }
            <b>:</b>
            <span>{timeLeft?.hours.slice(0,1)}</span>
            <span>{timeLeft?.hours.slice(1,2)}</span>
            <b>:</b>
            <span>{timeLeft?.minutes.slice(0,1)}</span>
            <span>{timeLeft?.minutes.slice(1,2)}</span>
            <b>:</b>
            <span>{timeLeft?.seconds.slice(0,1)}</span>
            <span>{timeLeft?.seconds.slice(1,2)}</span>
        </div>
    );
}