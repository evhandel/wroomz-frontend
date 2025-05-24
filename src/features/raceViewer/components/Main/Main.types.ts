// Define the structure of the lap data
export interface LapData {
    lapNumber: number;
    [key: `${number}_lapTime`]: number;
    [key: `${number}_pilot`]: string;
    [key: `${number}_kart`]: string;
}

// Define types for the CustomizedTooltip component props
export interface CustomizedTooltipProps {
    active?: boolean;
    payload?: any; // Using 'any' for simplicity, you can refine this based on the structure of the data
    label?: number;
}

export interface ResultsData {
    teamNumber: string;
    avgTimeTotal: number;
    laps: number;
    totalTimeWithGapWithoutPenalties: number;
    pilots: string[];
    penalty: number;
    stintsQuantity: number;
}
