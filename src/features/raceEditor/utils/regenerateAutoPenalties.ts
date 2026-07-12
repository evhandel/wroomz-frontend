import { v4 as uuidv4 } from 'uuid';
import type { Penalty, PenaltySource } from '@evhandel/wroomz-types';
import type { StintAnalysisData } from '../components/Main/Main.types';
import {
    detectStintLimitViolations,
    StintLimitViolation,
} from './detectStintLimitViolations';
import {
    detectPilotLimitViolations,
    PilotLimitViolation,
} from './detectPilotLimitViolations';
import { detectMinRestViolations } from './detectMinRestViolations';
import {
    formatAutoPenaltyDescription,
    AutoPenaltyViolation,
} from './formatAutoPenaltyDescription';

export interface RegenerateAutoPenaltiesInput {
    previousItems: Penalty[];
    stintsAnalysis: Record<string, StintAnalysisData[]>;
    maxStintSeconds: number;
    minForPilotByTeamSizeSeconds: Record<number, number>;
    autoChargeEnabled: boolean;
    mergeConsecutiveStints: boolean;
    minRestSeconds: number;
}

const violationKey = (
    source: PenaltySource,
    teamNumber: string,
    pilot: string | undefined,
    stintNumber: number | undefined
): string => `${source}|${teamNumber}|${pilot ?? ''}|${stintNumber ?? ''}`;

const penaltyKey = (p: Penalty): string =>
    violationKey(p.source, p.teamNumber, p.metadata?.pilot, p.metadata?.stintNumber);

const buildPenaltyFromViolation = (
    violation: AutoPenaltyViolation,
    previousAutoByKey: Map<string, Penalty>,
    autoChargeEnabled: boolean
): Penalty => {
    const key =
        violation.source === 'pilotLimit'
            ? violationKey('pilotLimit', violation.teamNumber, violation.pilot, undefined)
            : violationKey(violation.source, violation.teamNumber, violation.pilot, violation.stintNumber);

    const prior = previousAutoByKey.get(key);
    const description = formatAutoPenaltyDescription(violation);

    const servedInRace = prior?.servedInRace === true;

    const seconds = servedInRace
        ? 0
        : prior?.userEditedSeconds === true
          ? prior.seconds
          : autoChargeEnabled
            ? violation.formulaSeconds
            : 0;

    const base: Penalty = {
        id: prior?.id ?? uuidv4(),
        teamNumber: violation.teamNumber,
        seconds,
        description,
        source: violation.source,
        servedInRace,
        metadata:
            violation.source === 'pilotLimit'
                ? {
                      pilot: violation.pilot,
                      teamSize: violation.teamSize,
                      actualSeconds: violation.actualSeconds,
                      limitSeconds: violation.limitSeconds,
                  }
                : {
                      pilot: violation.pilot,
                      stintNumber: violation.stintNumber,
                      actualSeconds: violation.actualSeconds,
                      limitSeconds: violation.limitSeconds,
                  },
    };

    if (!servedInRace && prior?.userEditedSeconds === true) {
        base.userEditedSeconds = true;
    }

    return base;
};

export const regenerateAutoPenalties = ({
    previousItems,
    stintsAnalysis,
    maxStintSeconds,
    minForPilotByTeamSizeSeconds,
    autoChargeEnabled,
    mergeConsecutiveStints,
    minRestSeconds,
}: RegenerateAutoPenaltiesInput): Penalty[] => {
    const manualKept = previousItems.filter((p) => p.source === 'manual');

    const previousAutoByKey = new Map<string, Penalty>();
    previousItems
        .filter((p) => p.source !== 'manual')
        .forEach((p) => {
            previousAutoByKey.set(penaltyKey(p), p);
        });

    const stintViolations: StintLimitViolation[] = detectStintLimitViolations(
        stintsAnalysis,
        maxStintSeconds,
        mergeConsecutiveStints
    );
    const pilotViolations: PilotLimitViolation[] = detectPilotLimitViolations(
        stintsAnalysis,
        minForPilotByTeamSizeSeconds
    );
    const minRestViolations = detectMinRestViolations(stintsAnalysis, minRestSeconds);

    const autoItems: Penalty[] = [
        ...stintViolations.map((v) =>
            buildPenaltyFromViolation(v, previousAutoByKey, autoChargeEnabled)
        ),
        ...pilotViolations.map((v) =>
            buildPenaltyFromViolation(v, previousAutoByKey, autoChargeEnabled)
        ),
        ...minRestViolations.map((v) =>
            buildPenaltyFromViolation(v, previousAutoByKey, autoChargeEnabled)
        ),
    ];

    return [...manualKept, ...autoItems];
};
