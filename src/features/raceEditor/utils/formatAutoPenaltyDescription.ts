import { formatTime } from '../../raceViewer/helpers/format';
import type { StintLimitViolation } from './detectStintLimitViolations';
import type { PilotLimitViolation } from './detectPilotLimitViolations';
import type { MinRestViolation } from './detectMinRestViolations';

export type AutoPenaltyViolation = StintLimitViolation | PilotLimitViolation | MinRestViolation;

export const formatAutoPenaltyDescription = (violation: AutoPenaltyViolation): string => {
    if (violation.source === 'stintLimit') {
        return (
            `Stint limit exceeded (${violation.pilot}, stint #${violation.stintNumber}: ` +
            `${formatTime(violation.actualSeconds, false, true)} vs limit ` +
            `${formatTime(violation.limitSeconds, false, true)})`
        );
    }

    if (violation.source === 'minRest') {
        return (
            `Min rest (${violation.pilot} returned after ${formatTime(violation.actualSeconds, false, true)} rest, ` +
            `minimum ${formatTime(violation.limitSeconds, false, true)})`
        );
    }

    return (
        `Pilot minimum (${violation.pilot}: ` +
        `${formatTime(violation.actualSeconds, false, true)} vs minimum ` +
        `${formatTime(violation.limitSeconds, false, true)} for team size ${violation.teamSize})`
    );
};
