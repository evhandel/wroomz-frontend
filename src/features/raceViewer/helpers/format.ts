export const formatTime = (
    seconds: number,
    skipZeroMinutes = false,
    skipZeroMilliseconds = false
): string => {
    const negative = seconds < 0;

    // Round before splitting so milliseconds carry into seconds and minutes.
    const totalMilliseconds = Math.round(Math.abs(seconds) * 1000);

    const minutes = Math.floor(totalMilliseconds / 60000);
    const remainingSeconds = Math.floor(totalMilliseconds / 1000) % 60;
    const milliseconds = totalMilliseconds % 1000;

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
