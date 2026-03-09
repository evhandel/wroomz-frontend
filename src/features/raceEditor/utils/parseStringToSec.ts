export const parseStringToSec = (str: string) => {
    if (str.includes(':')) {
        const splittedStrArray = str.split(':');

        if (splittedStrArray.length === 2) {
            const minutesInSeconds = Number(splittedStrArray[0]) * 60;

            return minutesInSeconds + Number(splittedStrArray[1]);
        }

        if (splittedStrArray.length === 3) {
            const hoursInSeconds = Number(splittedStrArray[0]) * 60 * 60;
            const minutesInSeconds = Number(splittedStrArray[1]) * 60;

            return hoursInSeconds + minutesInSeconds + Number(splittedStrArray[2]);
        }
    }

    return Number(str);
}