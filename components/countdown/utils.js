import dayjs from 'dayjs';

export function calculateDiff(timestampMs) {
    const timestampDayjs = dayjs(timestampMs);
    const nowDayjs = dayjs();

    if (timestampDayjs.isBefore(nowDayjs)) {
        return {
            seconds: "00",
            minutes: "00",
            hours: "00",
            days: "00",        
        };
    }

    return {
        seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
        minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
        hours: getRemainingHours(nowDayjs, timestampDayjs),
        days: getRemainingDays(nowDayjs, timestampDayjs),
    };  
}

function getRemainingSeconds(nowDayjs, timestampDayjs) {
    const diff = timestampDayjs.diff(nowDayjs, 'second');
    return diff < 10 ? `0${diff}` : diff;
}

function getRemainingMinutes(nowDayjs, timestampDayjs) {
    const diff = timestampDayjs.diff(nowDayjs, 'minute') % 60;
    return diff < 10 ? `0${diff}` : diff;
}

function getRemainingHours(nowDayjs, timestampDayjs) {
    const diff = timestampDayjs.diff(nowDayjs, 'hour') % 24;
    return diff < 10 ? `0${diff}` : diff;
}

function getRemainingDays(nowDayjs, timestampDayjs) {
    const diff = timestampDayjs.diff(nowDayjs, 'day');
    return diff < 10 ? `0${diff}` : diff;
}