import type { Penalty } from '@evhandel/wroomz-types';

export const isMeaningfulPenalty = (p: Penalty): boolean =>
    p.seconds !== 0 || p.servedInRace === true;
