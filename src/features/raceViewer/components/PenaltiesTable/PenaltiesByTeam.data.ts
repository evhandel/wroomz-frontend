import { useMemo } from 'react';
import type { Penalty } from '@evhandel/wroomz-types';
import { isMeaningfulPenalty } from '../../../raceEditor/utils/isMeaningfulPenalty';
import { useRaceData } from '../../data/useRaceData';

export interface TeamPenaltiesInfo {
    items: Penalty[];
    total: number;
    isDisqualified: boolean;
}

export const usePenaltiesByTeam = (raceId: string): Map<string, TeamPenaltiesInfo> => {
    const { data } = useRaceData(raceId);

    return useMemo(() => {
        const map = new Map<string, TeamPenaltiesInfo>();
        if (!data) return map;

        const items = (data.penalties.items ?? []).filter(isMeaningfulPenalty);
        const dsqSet = new Set(data.penalties.disqualifiedTeams ?? []);

        const itemsByTeam = new Map<string, Penalty[]>();
        for (const p of items) {
            const arr = itemsByTeam.get(p.teamNumber);
            if (arr) arr.push(p);
            else itemsByTeam.set(p.teamNumber, [p]);
        }

        for (const r of data.results) {
            const teamItems = itemsByTeam.get(r.teamNumber) ?? [];
            const total = teamItems.reduce(
                (acc, p) => acc + (p.servedInRace === true ? 0 : p.seconds),
                0,
            );
            map.set(r.teamNumber, {
                items: teamItems,
                total,
                isDisqualified: dsqSet.has(r.teamNumber),
            });
        }

        return map;
    }, [data]);
};
