import { createRaceEditorStore } from '../raceEditorStore';
import type { Penalty } from '@evhandel/wroomz-types';

const makeAutoPenalty = (overrides: Partial<Penalty> = {}): Penalty => ({
    id: 'auto-1',
    teamNumber: '1',
    seconds: 21,
    description: 'Stint limit exceeded',
    source: 'stintLimit',
    metadata: { pilot: 'Alice', stintNumber: 1 },
    ...overrides,
});

describe('raceEditorStore — setPenaltyServedInRace', () => {
    it('value=true sets servedInRace=true, seconds=0, and drops userEditedSeconds', () => {
        const store = createRaceEditorStore({});
        const initial = makeAutoPenalty({
            id: 'p-1',
            seconds: 42,
            userEditedSeconds: true,
        });
        store.setState({ penalties: [initial] });

        store.getState().setPenaltyServedInRace('p-1', true);

        const [updated] = store.getState().penalties;
        expect(updated.id).toBe('p-1');
        expect(updated.servedInRace).toBe(true);
        expect(updated.seconds).toBe(0);
        expect(updated.userEditedSeconds).toBeUndefined();
        expect(updated).not.toHaveProperty('userEditedSeconds');
    });

    it('value=false sets servedInRace=false and leaves seconds untouched', () => {
        const store = createRaceEditorStore({});
        const initial = makeAutoPenalty({
            id: 'p-2',
            seconds: 0,
            servedInRace: true,
        });
        store.setState({ penalties: [initial] });

        store.getState().setPenaltyServedInRace('p-2', false);

        const [updated] = store.getState().penalties;
        expect(updated.id).toBe('p-2');
        expect(updated.servedInRace).toBe(false);
        expect(updated.seconds).toBe(0);
    });

    it('non-existent id warns and leaves state unchanged', () => {
        const store = createRaceEditorStore({});
        const initial = makeAutoPenalty({ id: 'p-3' });
        store.setState({ penalties: [initial] });

        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const before = store.getState().penalties;

        store.getState().setPenaltyServedInRace('does-not-exist', true);

        const after = store.getState().penalties;
        expect(after).toBe(before);
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining('setPenaltyServedInRace: penalty does-not-exist not found')
        );

        warnSpy.mockRestore();
    });
});
