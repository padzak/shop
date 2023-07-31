

export function calculateDiff(timestampMs) {
    const now = new Date().getTime();
    const diff = timestampMs - now;
    if (diff < 0) {
        return remainingTime;
    }
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return {
        seconds: seconds < 10 ? `0${seconds}` : seconds,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        hours: hours < 10 ? `0${hours}` : hours,
        days: days < 10 ? `0${days}` : days,
    };    
}