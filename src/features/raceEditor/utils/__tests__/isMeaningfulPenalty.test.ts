import { isMeaningfulPenalty } from '../isMeaningfulPenalty';
import type { Penalty } from '@evhandel/wroomz-types';

const makePenalty = (overrides: Partial<Penalty> = {}): Penalty => ({
    id: 'p1',
    teamNumber: '1',
    seconds: 0,
    description: 'test',
    source: 'manual',
    ...overrides,
});

describe('isMeaningfulPenalty', () => {
    it('returns true when seconds=0 and servedInRace=true (served penalty is meaningful)', () => {
        const p = makePenalty({ seconds: 0, servedInRace: true });
        expect(isMeaningfulPenalty(p)).toBe(true);
    });

    it('returns false when seconds=0 and servedInRace=false', () => {
        const p = makePenalty({ seconds: 0, servedInRace: false });
        expect(isMeaningfulPenalty(p)).toBe(false);
    });

    it('returns false when seconds=0 and servedInRace is undefined', () => {
        const p = makePenalty({ seconds: 0 });
        expect(isMeaningfulPenalty(p)).toBe(false);
    });

    it('returns true when seconds=5 and servedInRace=false', () => {
        const p = makePenalty({ seconds: 5, servedInRace: false });
        expect(isMeaningfulPenalty(p)).toBe(true);
    });

    it('returns true when seconds=5 and servedInRace is undefined (bonus)', () => {
        const p = makePenalty({ seconds: 5 });
        expect(isMeaningfulPenalty(p)).toBe(true);
    });
});
