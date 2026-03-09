export interface ColorPalette {
    fastest: { r: number; g: number; b: number };
    slowest: { r: number; g: number; b: number };
}

export const BG_PALETTE: ColorPalette = {
    fastest: { r: 0, g: 60, b: 0 },
    slowest: { r: 60, g: 0, b: 0 },
};

export const ACCENT_PALETTE: ColorPalette = {
    fastest: { r: 0, g: 247, b: 30 },
    slowest: { r: 255, g: 30, b: 30 },
};

export const getColorForLapTime = (
    time: number,
    fastestTime: number,
    palette: ColorPalette,
    alpha = 1
): string => {
    const diff = time - fastestTime;

    if (diff <= 0) {
        const { r, g, b } = palette.fastest;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    if (diff <= 2) {
        const ratio = diff / 2;
        const { fastest, slowest } = palette;
        const r = Math.round(fastest.r + (slowest.r - fastest.r) * ratio);
        const g = Math.round(fastest.g + (slowest.g - fastest.g) * ratio);
        const b = Math.round(fastest.b + (slowest.b - fastest.b) * ratio);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const { r, g, b } = palette.slowest;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
