import { getMergedStintMarkers } from '../getMergedStintMarkers';
import { StintAnalysis } from '@evhandel/wroomz-types';

const makeStint = (overrides: Partial<StintAnalysis> = {}): StintAnalysis => ({
    no: 1,
    laps: [],
    startGap: 0,
    startTime: 0,
    endTime: 100,
    duration: 100,
    avgLapExcludingPitExitLap: 0,
    bestLap: 0,
    pilot: 'Alice',
    kart: 'K1',
    ...overrides,
});

describe('getMergedStintMarkers', () => {
    it('returns empty map when merge is off', () => {
        const analysis = {
            '1': [
                makeStint({ no: 1, pilot: 'Alice', startTime: 0, duration: 1500 }),
                makeStint({ no: 2, pilot: 'Alice', startTime: 1500, duration: 1500 }),
            ],
        };
        expect(getMergedStintMarkers(analysis, 40, false).size).toBe(0);
    });

    it('returns empty map when maxStint is 0', () => {
        const analysis = {
            '1': [
                makeStint({ no: 1, pilot: 'Alice', startTime: 0, duration: 1500 }),
                makeStint({ no: 2, pilot: 'Alice', startTime: 1500, duration: 1500 }),
            ],
        };
        expect(getMergedStintMarkers(analysis, 0, true).size).toBe(0);
    });

    it('returns empty map for two consecutive stints under the merged limit', () => {
        // 20:00 + 15:00 = 35:00 < 40:00
        const analysis = {
            '1': [
                makeStint({ no: 1, pilot: 'Alice', startTime: 0, duration: 1200 }),
                makeStint({ no: 2, pilot: 'Alice', startTime: 1200, duration: 900 }),
            ],
        };
        expect(getMergedStintMarkers(analysis, 40, true).size).toBe(0);
    });

    it('marks two consecutive stints over the merged limit as top/bottom', () => {
        // 03:05 + 36:59 ≈ 40:04 > 40:00
        const analysis = {
            '1': [
                makeStint({ no: 5, pilot: 'Maslennikov', startTime: 0, duration: 185 }),
                makeStint({ no: 6, pilot: 'Maslennikov', startTime: 185, duration: 2219 }),
            ],
        };
        const markers = getMergedStintMarkers(analysis, 40, true);
        expect(markers.get('1:5')).toBe('top');
        expect(markers.get('1:6')).toBe('bottom');
        expect(markers.size).toBe(2);
    });

    it('marks three consecutive stints over the merged limit as top/middle/bottom', () => {
        const analysis = {
            '1': [
                makeStint({ no: 1, pilot: 'Alice', startTime: 0, duration: 900 }),
                makeStint({ no: 2, pilot: 'Alice', startTime: 900, duration: 900 }),
                makeStint({ no: 3, pilot: 'Alice', startTime: 1800, duration: 900 }),
            ],
        };
        const markers = getMergedStintMarkers(analysis, 40, true);
        expect(markers.get('1:1')).toBe('top');
        expect(markers.get('1:2')).toBe('middle');
        expect(markers.get('1:3')).toBe('bottom');
        expect(markers.size).toBe(3);
    });

    it('does not mark non-consecutive stints of the same pilot (A, B, A)', () => {
        const analysis = {
            '1': [
                makeStint({ no: 1, pilot: 'Alice', startTime: 0, duration: 1500 }),
                makeStint({ no: 2, pilot: 'Bob', startTime: 1500, duration: 600 }),
                makeStint({ no: 3, pilot: 'Alice', startTime: 2100, duration: 1500 }),
            ],
        };
        expect(getMergedStintMarkers(analysis, 40, true).size).toBe(0);
    });

    it('does not mark a single over-limit stint (handled by per-stint coloring)', () => {
        const analysis = {
            '1': [makeStint({ no: 1, pilot: 'Alice', startTime: 0, duration: 2423 })],
        };
        expect(getMergedStintMarkers(analysis, 40, true).size).toBe(0);
    });
});
