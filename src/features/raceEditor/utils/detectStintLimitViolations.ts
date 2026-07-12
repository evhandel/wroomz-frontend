import { StintAnalysisData } from '../components/Main/Main.types';
import { MIN_PENALTY_SECONDS } from './penalties.constants';
import { getPilotDrivingSegments } from './getPilotDrivingSegments';

export interface StintLimitViolation {
    source: 'stintLimit';
    teamNumber: string;
    pilot: string;
    stintNumber: number;
    actualSeconds: number;
    limitSeconds: number;
    formulaSeconds: number;
}

const computeStintFormulaSeconds = (actualSeconds: number, limitSeconds: number): number => {
    const exceeding = actualSeconds - limitSeconds;
    if (exceeding <= MIN_PENALTY_SECONDS) {
        return MIN_PENALTY_SECONDS;
    }
    return Math.floor(exceeding + 1);
};

export const detectStintLimitViolations = (
    stintsAnalysis: Record<string, StintAnalysisData[]>,
    maxStintDuration: number,
    mergeConsecutive = false
): StintLimitViolation[] => {
    const violations: StintLimitViolation[] = [];

    if (maxStintDuration <= 0) {
        return violations;
    }

    for (const teamNumber in stintsAnalysis) {
        if (mergeConsecutive) {
            getPilotDrivingSegments(stintsAnalysis[teamNumber]).forEach((seg) => {
                if (seg.duration > maxStintDuration) {
                    violations.push({
                        source: 'stintLimit',
                        teamNumber,
                        pilot: seg.pilot,
                        stintNumber: seg.firstStintNumber,
                        actualSeconds: seg.duration,
                        limitSeconds: maxStintDuration,
                        formulaSeconds: computeStintFormulaSeconds(seg.duration, maxStintDuration),
                    });
                }
            });
        } else {
            stintsAnalysis[teamNumber].forEach((stint) => {
                if (stint.duration > maxStintDuration) {
                    violations.push({
                        source: 'stintLimit',
                        teamNumber,
                        pilot: stint.pilot,
                        stintNumber: stint.no,
                        actualSeconds: stint.duration,
                        limitSeconds: maxStintDuration,
                        formulaSeconds: computeStintFormulaSeconds(stint.duration, maxStintDuration),
                    });
                }
            });
        }
    }

    return violations;
};
