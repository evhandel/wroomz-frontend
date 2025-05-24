export const getMutedColorForLapTime = (time: number, fastestTime: number) => {
    const diff = time - fastestTime;

    if (diff <= 0) {
        // Самое быстрое время, приглушенный зеленый
        return 'rgb(0, 153, 0)'; // Приглушенный зеленый
    } else if (diff <= 2) {
        // Плавный переход от приглушенного зеленого к приглушенному красному через приглушенный желтый
        const ratio = diff / 2; // нормализуем разницу (от 0 до 1)
        const red = Math.round(153 * ratio); // Увеличение компонента красного
        const green = Math.round(153 * (1 - ratio)); // Уменьшение компонента зеленого
        return `rgb(${red}, ${green}, 0)`; // Приглушенный желтый
    } else {
        // Все времена, которые медленнее на более чем 2 секунды, приглушенный темно-красный
        return 'rgb(102, 0, 0)'; // Приглушенный темно-красный
    }
};

export const getLightColorForLapTime = (time: number, fastestTime: number, alpha: number = 1) => {
    const diff = time - fastestTime;

    if (diff <= 0) {
        // Самое быстрое время, зеленый
        return `rgba(0, 247, 30, ${alpha})`; // зеленый
    } else if (diff <= 2) {
        // Плавный переход от зеленого к красному через желтый
        const ratio = diff / 2; // нормализуем разницу (от 0 до 1)
        const red = Math.round(255 * ratio + 204 * (1 - ratio)); // Плавный переход к красному
        const green = Math.round(255 * (1 - ratio) + 204 * ratio); // Плавный переход от зеленого к желтому
        return `rgba(${red}, ${green}, 30, ${alpha})`; // желтый оттенок
    } else {
        // Все времена, которые медленнее на более чем 2 секунды, красный
        return `rgba(255, 30, 30, ${alpha})`; // красный
    }
};

export const getBgColorForLapTime = (time: number, fastestTime: number, alpha: number = 1) => {
    const diff = time - fastestTime;

    if (diff <= 0) {
        // Самое быстрое время, темно-зеленый
        return `rgba(0, 60, 0, ${alpha})`; // темно-зеленый
    } else if (diff <= 2) {
        // Плавный переход от темно-зеленого к темно-красному через темно-желтый
        const ratio = diff / 2; // нормализуем разницу (от 0 до 1)
        const red = Math.round(60 * ratio); // Плавный переход к темно-красному
        const green = Math.round(60 - 60 * ratio); // Плавный переход от темно-зеленого к желтому
        return `rgba(${red}, ${green}, 0, ${alpha})`; // темно желтый оттенок
    } else {
        // Все времена, которые медленнее на более чем 2 секунды, темно-красный
        return `rgba(60, 0, 0, ${alpha})`; // темно-красный
    }
};

export const getAccidentColorForLapTime = (
    time: number,
    fastestTime: number,
    alpha: number = 1
) => {
    const diff = time - fastestTime;

    if (diff <= 0) {
        // Самое быстрое время, ярко-зеленый
        return `rgba(0, 247, 30, ${alpha})`; // ярко-зеленый
    } else if (diff <= 2) {
        // Плавный переход от ярко-зеленого к ярко-красному через ярко-желтый
        const ratio = diff / 2; // нормализуем разницу (от 0 до 1)
        const red = Math.round(255 * ratio); // Плавный переход к ярко-красному
        const green = Math.round(247 - (247 - 30) * ratio); // Плавный переход от ярко-зеленого к желтому
        return `rgba(${red}, ${green}, 30, ${alpha})`; // ярко желтый оттенок
    } else {
        // Все времена, которые медленнее на более чем 2 секунды, ярко-красный
        return `rgba(255, 30, 30, ${alpha})`; // ярко-красный
    }
};

export const getLightColorForLapTimeBac = (
    time: number,
    fastestTime: number,
    alpha: number = 1
) => {
    const diff = time - fastestTime;

    if (diff <= 0) {
        // Самое быстрое время, светлый зеленый
        return `rgba(204, 255, 204, ${alpha})`; // Светло-зеленый
    } else if (diff <= 2) {
        // Плавный переход от светло-зеленого к светло-красному через светло-желтый
        const ratio = diff / 2; // нормализуем разницу (от 0 до 1)
        const red = Math.round(255 * ratio + 204 * (1 - ratio)); // Плавный переход к светло-красному
        const green = Math.round(255 * (1 - ratio) + 204 * ratio); // Плавный переход от светло-зеленого к желтому
        return `rgba(${red}, ${green}, 204, ${alpha})`; // Светлый желтый оттенок
    } else {
        // Все времена, которые медленнее на более чем 2 секунды, светло-красный
        return `rgba(255, 204, 204, ${alpha})`; // Светло-красный
    }
};

export const getLighterColorForLapTime = (lapTime: number, bestLapTime: number) => {
    const timeDifference = lapTime - bestLapTime;

    if (timeDifference <= 2) {
        // Calculate a color from green to yellow based on time difference
        const ratio = timeDifference / 2;
        const red = Math.round(255 * ratio);
        const green = Math.round(255 * (1 - ratio));
        return `rgba(${red}, ${green}, 0, 0.2)`; // Lower opacity for lighter colors
    } else {
        // Dark red for times slower than 2 seconds
        return 'rgba(139, 0, 0, 0.1)'; // Lower opacity to make it even lighter
    }
};
