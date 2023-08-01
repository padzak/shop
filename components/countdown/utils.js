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
    return padWithZeros(diff, 2);
}

function getRemainingMinutes(nowDayjs, timestampDayjs) {
    const diff = timestampDayjs.diff(nowDayjs, 'minute') % 60;
    return padWithZeros(diff, 2);
}

function getRemainingHours(nowDayjs, timestampDayjs) {
    const diff = timestampDayjs.diff(nowDayjs, 'hour') % 24;
    return padWithZeros(diff, 2);
}

function getRemainingDays(nowDayjs, timestampDayjs) {
    const diff = timestampDayjs.diff(nowDayjs, 'day');
    return padWithZeros(diff, 2);
}

function formatNumber(number) {
    return number < 10 ? `0${number}` : number.toString();
}

function padWithZeros(number, length) {
    const numberString = number.toString();
    if (numberString.length >= length) {
        return numberString;
    }
    return "0".repeat(length - numberString.length) + numberString;
}