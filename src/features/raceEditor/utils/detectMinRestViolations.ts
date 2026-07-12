import { StintAnalysisData } from '../components/Main/Main.types';
import { getPilotDrivingSegments } from './getPilotDrivingSegments';

export interface MinRestViolation {
    source: 'minRest';
    teamNumber: string;
    pilot: string;
    stintNumber: number;
    actualSeconds: number;
    limitSeconds: number;
    formulaSeconds: 0;
}

export const detectMinRestViolations = (
    stintsAnalysis: Record<string, StintAnalysisData[]>,
    minRestSeconds: number
): MinRestViolation[] => {
    const violations: MinRestViolation[] = [];
    if (minRestSeconds <= 0) return violations;

    for (const teamNumber in stintsAnalysis) {
        const segments = getPilotDrivingSegments(stintsAnalysis[teamNumber]);
        const lastEndByPilot: Record<string, number> = {};

        for (const seg of segments) {
            const lastEnd = lastEndByPilot[seg.pilot];
            if (lastEnd !== undefined) {
                const rest = seg.startTime - lastEnd;
                if (rest < minRestSeconds) {
                    violations.push({
                        source: 'minRest',
                        teamNumber,
                        pilot: seg.pilot,
                        stintNumber: seg.firstStintNumber,
                        actualSeconds: rest,
                        limitSeconds: minRestSeconds,
                        formulaSeconds: 0,
                    });
                }
            }
            lastEndByPilot[seg.pilot] = seg.endTime;
        }
    }
    return violations;
};
