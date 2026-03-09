import { getStintsAnalysis } from '../getStintsAnalysis';
import { RaceData, StintsByPilotsData } from '../../components/Main/Main.types';
import { SettingsData } from '../../components/Settings/Settings.types';

describe('getStintsAnalysis', () => {
    const settings: SettingsData = { pitStopDetectionTime: '120' };

    it('creates a single stint when no pit stop laps', () => {
        const raceData: RaceData = {
            '1': {
                laps: [
                    { lapTime: 60, elapsedTime: 60 },
                    { lapTime: 62, elapsedTime: 122 },
                    { lapTime: 61, elapsedTime: 183 },
                ],
                startGap: 5,
            },
        };
        const stintsByPilots: StintsByPilotsData = {
            '1': [{ pilot: 'Alice', kart: 'K1' }],
        };

        const result = getStintsAnalysis(raceData, stintsByPilots, settings);

        expect(result['1']).toHaveLength(1);
        expect(result['1'][0].pilot).toBe('Alice');
        expect(result['1'][0].laps).toHaveLength(3);
        expect(result['1'][0].bestLap).toBe(60);
    });

    it('splits stints at pit stop laps', () => {
        const raceData: RaceData = {
            '1': {
                laps: [
                    { lapTime: 60, elapsedTime: 60 },
                    { lapTime: 62, elapsedTime: 122 },
                    { lapTime: 150, elapsedTime: 272 }, // pit stop lap
                    { lapTime: 61, elapsedTime: 333 },
                    { lapTime: 63, elapsedTime: 396 },
                ],
                startGap: 0,
            },
        };
        const stintsByPilots: StintsByPilotsData = {
            '1': [
                { pilot: 'Alice', kart: 'K1' },
                { pilot: 'Bob', kart: 'K2' },
            ],
        };

        const result = getStintsAnalysis(raceData, stintsByPilots, settings);

        expect(result['1']).toHaveLength(2);
        expect(result['1'][0].pilot).toBe('Alice');
        expect(result['1'][0].laps).toHaveLength(2);
        expect(result['1'][1].pilot).toBe('Bob');
        expect(result['1'][1].laps).toHaveLength(3); // pit stop lap + 2 regular laps
    });

    it('calls onError when stint data is missing', () => {
        const raceData: RaceData = {
            '1': {
                laps: [
                    { lapTime: 60, elapsedTime: 60 },
                    { lapTime: 150, elapsedTime: 210 }, // pit stop, triggers stint 2
                ],
                startGap: 0,
            },
        };
        const stintsByPilots: StintsByPilotsData = {
            '1': [{ pilot: 'Alice', kart: 'K1' }], // only 1 stint defined
        };

        const onError = jest.fn();
        const result = getStintsAnalysis(raceData, stintsByPilots, settings, onError);
        expect(onError).toHaveBeenCalledWith(
            'No data for stint number 2 for team number 1'
        );
        // Should still produce 2 stints with empty pilot for the missing entry
        expect(result['1']).toHaveLength(2);
        expect(result['1'][1].pilot).toBe('');
    });

    describe('with stintOverrides', () => {
        it('uses manual split points instead of auto-detection', () => {
            const raceData: RaceData = {
                '1': {
                    laps: [
                        { lapTime: 60, elapsedTime: 60 },
                        { lapTime: 62, elapsedTime: 122 },
                        { lapTime: 61, elapsedTime: 183 },
                        { lapTime: 63, elapsedTime: 246 },
                    ],
                    startGap: 0,
                },
            };
            const stintsByPilots: StintsByPilotsData = {
                '1': [
                    { pilot: 'Alice', kart: 'K1' },
                    { pilot: 'Bob', kart: 'K2' },
                ],
            };
            // Force a split at lap 3 even though no lap exceeds pitStopDetectionTime
            const overrides = { '1': [1, 3] };

            const result = getStintsAnalysis(
                raceData,
                stintsByPilots,
                settings,
                undefined,
                overrides
            );

            expect(result['1']).toHaveLength(2);
            expect(result['1'][0].laps).toHaveLength(2); // laps 1-2
            expect(result['1'][0].pilot).toBe('Alice');
            expect(result['1'][1].laps).toHaveLength(2); // laps 3-4
            expect(result['1'][1].pilot).toBe('Bob');
        });

        it('overrides prevent auto-detection splits', () => {
            const raceData: RaceData = {
                '1': {
                    laps: [
                        { lapTime: 60, elapsedTime: 60 },
                        { lapTime: 150, elapsedTime: 210 }, // would normally trigger split
                        { lapTime: 62, elapsedTime: 272 },
                    ],
                    startGap: 0,
                },
            };
            const stintsByPilots: StintsByPilotsData = {
                '1': [{ pilot: 'Alice', kart: 'K1' }],
            };
            // Override says no split points other than lap 1 -- force single stint
            const overrides = { '1': [1] };

            const result = getStintsAnalysis(
                raceData,
                stintsByPilots,
                settings,
                undefined,
                overrides
            );

            expect(result['1']).toHaveLength(1);
            expect(result['1'][0].laps).toHaveLength(3);
        });

        it('falls back to auto-detection when team has no override', () => {
            const raceData: RaceData = {
                '1': {
                    laps: [
                        { lapTime: 60, elapsedTime: 60 },
                        { lapTime: 150, elapsedTime: 210 },
                        { lapTime: 62, elapsedTime: 272 },
                    ],
                    startGap: 0,
                },
            };
            const stintsByPilots: StintsByPilotsData = {
                '1': [
                    { pilot: 'Alice', kart: 'K1' },
                    { pilot: 'Bob', kart: 'K2' },
                ],
            };
            const overrides = { '2': [1, 5] }; // override for team 2, not team 1

            const result = getStintsAnalysis(
                raceData,
                stintsByPilots,
                settings,
                undefined,
                overrides
            );

            expect(result['1']).toHaveLength(2); // auto-detected split
        });

        it('handles undefined overrides the same as no overrides', () => {
            const raceData: RaceData = {
                '1': {
                    laps: [
                        { lapTime: 60, elapsedTime: 60 },
                        { lapTime: 150, elapsedTime: 210 },
                        { lapTime: 62, elapsedTime: 272 },
                    ],
                    startGap: 0,
                },
            };
            const stintsByPilots: StintsByPilotsData = {
                '1': [
                    { pilot: 'Alice', kart: 'K1' },
                    { pilot: 'Bob', kart: 'K2' },
                ],
            };

            const resultWithoutOverrides = getStintsAnalysis(
                raceData,
                stintsByPilots,
                settings
            );
            const resultWithUndefined = getStintsAnalysis(
                raceData,
                stintsByPilots,
                settings,
                undefined,
                undefined
            );
            const resultWithEmptyOverrides = getStintsAnalysis(
                raceData,
                stintsByPilots,
                settings,
                undefined,
                {}
            );

            expect(resultWithoutOverrides).toEqual(resultWithUndefined);
            expect(resultWithoutOverrides).toEqual(resultWithEmptyOverrides);
        });

        it('handles multiple overrides for same team', () => {
            const raceData: RaceData = {
                '1': {
                    laps: [
                        { lapTime: 60, elapsedTime: 60 },
                        { lapTime: 62, elapsedTime: 122 },
                        { lapTime: 61, elapsedTime: 183 },
                        { lapTime: 63, elapsedTime: 246 },
                        { lapTime: 60, elapsedTime: 306 },
                        { lapTime: 62, elapsedTime: 368 },
                    ],
                    startGap: 0,
                },
            };
            const stintsByPilots: StintsByPilotsData = {
                '1': [
                    { pilot: 'Alice', kart: 'K1' },
                    { pilot: 'Bob', kart: 'K2' },
                    { pilot: 'Carol', kart: 'K3' },
                ],
            };
            const overrides = { '1': [1, 3, 5] };

            const result = getStintsAnalysis(
                raceData,
                stintsByPilots,
                settings,
                undefined,
                overrides
            );

            expect(result['1']).toHaveLength(3);
            expect(result['1'][0].laps).toHaveLength(2);
            expect(result['1'][1].laps).toHaveLength(2);
            expect(result['1'][2].laps).toHaveLength(2);
            expect(result['1'][0].pilot).toBe('Alice');
            expect(result['1'][1].pilot).toBe('Bob');
            expect(result['1'][2].pilot).toBe('Carol');
        });
    });
});
