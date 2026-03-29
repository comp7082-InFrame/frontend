import dayjs from "dayjs";

function formatTimeHHmm(time: Date | string) {
    return dayjs(time).format("HH:mm");
}

function formatTimeYYYYMMDD(time: Date | string) {
    return dayjs(time).format("YYYY/MM/DD");
}

function formatStartDate(time: Date | string) {
    return dayjs(time).format("YYYY-MM-DD 00:00:00");
}

function formatEndDate(time: Date | string) {
    return dayjs(time).format("YYYY-MM-DD 23:59:59");
}

function formatTimeYYYYMMDDHHmmss(time: Date | string) {
    return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
}

function formatTimeYYYYMMDDHHmmss12Hrs(time: Date | string) {
    return dayjs(time).format("YYYY-MM-DD hh:mm:ss A");
}

export { formatTimeHHmm, formatTimeYYYYMMDD, formatStartDate, formatEndDate, formatTimeYYYYMMDDHHmmss, formatTimeYYYYMMDDHHmmss12Hrs }