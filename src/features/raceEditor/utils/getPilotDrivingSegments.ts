import { StintAnalysisData } from '../components/Main/Main.types';

export interface PilotDrivingSegment {
    pilot: string;
    firstStintNumber: number;
    startTime: number;
    endTime: number;
    duration: number;
}

export const getPilotDrivingSegments = (
    stints: StintAnalysisData[]
): PilotDrivingSegment[] => {
    const sorted = [...stints].sort((a, b) => a.startTime - b.startTime);
    const segments: PilotDrivingSegment[] = [];

    for (const stint of sorted) {
        const last = segments[segments.length - 1];
        if (last && last.pilot === stint.pilot) {
            last.endTime = stint.endTime;
            last.duration += stint.duration;
        } else {
            segments.push({
                pilot: stint.pilot,
                firstStintNumber: stint.no,
                startTime: stint.startTime,
                endTime: stint.endTime,
                duration: stint.duration,
            });
        }
    }
    return segments;
};
