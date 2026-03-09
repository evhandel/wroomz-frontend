export const formatTime = (seconds: number, skipZeroMinutes = false, skipZeroMilliseconds = false): string => {
    const negative = seconds < 0;

    const positiveSeconts = negative ? seconds * -1 : seconds;

    const minutes = Math.floor(positiveSeconts / 60); // Calculate minutes
    const remainingSeconds = Math.floor(positiveSeconts % 60); // Remaining seconds (integer part)
    const milliseconds = Math.floor((positiveSeconts % 1) * 1000); // Milliseconds (fractional part)

    // Pad minutes, seconds, and milliseconds with leading zeros if needed
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(3, '0');

    const prefix = negative ? '-' : '';

    if (skipZeroMinutes && !minutes) {
        if (skipZeroMilliseconds && !milliseconds) {
            if (seconds === 0) {
                return '0s';
            }
            return `${prefix}${formattedSeconds}s`;
        }
        return `${prefix}${formattedSeconds}.${formattedMilliseconds}`;
    } else {
        if (skipZeroMilliseconds && !milliseconds) {
            return `${prefix}${formattedMinutes}:${formattedSeconds}`;
        }
        return `${prefix}${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
    }
};
