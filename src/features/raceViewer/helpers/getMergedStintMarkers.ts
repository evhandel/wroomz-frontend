import { StintAnalysis } from '@evhandel/wroomz-types';

export type MergedStintMarker = 'top' | 'middle' | 'bottom';

// Keyed by `${teamNumber}:${stintNo}`.
//
// When the `mergeConsecutiveStintsForMax` setting is on, the penalty engine
// treats consecutive stints of the same pilot as a single max-stint limit and
// compares their combined duration against maxStint. The public viewer has no
// concept of that rule, so a group that only exceeds the limit when merged goes
// unmarked. This recomputes those merged segments (grouping logic mirrors
// raceEditor/utils/getPilotDrivingSegments.ts — keep the two in sync) and marks
// every stint of an over-limit multi-stint group so the cell can draw a bracket.
export const getMergedStintMarkers = (
    stintsAnalysis: Record<string, StintAnalysis[]>,
    maxStintMinutes: number,
    mergeConsecutive: boolean
): Map<string, MergedStintMarker> => {
    const markers = new Map<string, MergedStintMarker>();

    if (!mergeConsecutive || maxStintMinutes <= 0) {
        return markers;
    }

    const maxStintSeconds = maxStintMinutes * 60;

    for (const teamNumber in stintsAnalysis) {
        const sorted = [...stintsAnalysis[teamNumber]].sort(
            (a, b) => a.startTime - b.startTime
        );

        let segment: { stintNos: number[]; duration: number; pilot: string } | null = null;
        const segments: { stintNos: number[]; duration: number }[] = [];

        for (const stint of sorted) {
            if (segment && segment.pilot === stint.pilot) {
                segment.stintNos.push(stint.no);
                segment.duration += stint.duration;
            } else {
                segment = {
                    pilot: stint.pilot,
                    stintNos: [stint.no],
                    duration: stint.duration,
                };
                segments.push(segment);
            }
        }

        for (const seg of segments) {
            if (seg.stintNos.length < 2 || seg.duration <= maxStintSeconds) {
                continue;
            }
            seg.stintNos.forEach((stintNo, index) => {
                const marker: MergedStintMarker =
                    index === 0
                        ? 'top'
                        : index === seg.stintNos.length - 1
                          ? 'bottom'
                          : 'middle';
                markers.set(`${teamNumber}:${stintNo}`, marker);
            });
        }
    }

    return markers;
};
