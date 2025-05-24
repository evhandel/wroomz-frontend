export interface CalculatedData {
    results: Array<{
        avgTimeTotal: number;
        teamNumber: string;
        pilots: string[];
        laps: number;
        totalTimeWithGapWithoutPenalties: number;
        penalty: number;
        stintsQuantity: number;
    }>;
    stintsAnalysis: Record<
        string,
        Array<{
            no: number;
            laps: Array<{ no: number; time: number; elapsedTime: number }>;
            startGap: number;
            startTime: number;
            endTime: number;
            duration: number;
            avgLapExcludingPitExitLap: number;
            bestLap: number;
            pilot: string;
            kart?: string;
        }>
    >;
    penalties: {
        penaltiesManual: Record<string, number>;
        penaltiesByStintLimit: Record<string, number>;
        penaltiesByPilotLimit: Record<string, number>;
    };
    settingsData: {
        maxStint: number;
        minForPilotIfFour: number;
        minForPilotIfThree: number;
        minForPilotIfTwo: number;
        minPitStopLapTime: number;
        minStintsQuantity: number;
    };
}
