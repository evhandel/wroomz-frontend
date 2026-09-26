import { formatTime } from '../format';

describe('formatTime', () => {
    it.each<[number, string]>([
        [1.001, '00:01.001'],
        [65.123, '01:05.123'],
        [1.2344, '00:01.234'],
        [1.2346, '00:01.235'],
        [1.9996, '00:02.000'],
        [59.9996, '01:00.000'],
        [3599.9996, '60:00.000'],
        [-65.123, '-01:05.123'],
        [-59.9996, '-01:00.000'],
        [0, '00:00.000'],
    ])('rounds %s seconds to %s', (seconds, expected) => {
        expect(formatTime(seconds)).toBe(expected);
    });

    it('applies zero-skipping options to the rounded time', () => {
        expect(formatTime(1.001, true)).toBe('01.001');
        expect(formatTime(1.9996, true, true)).toBe('02s');
        expect(formatTime(59.9996, true, true)).toBe('01:00');
        expect(formatTime(-59.9996, false, true)).toBe('-01:00');
        expect(formatTime(0, true, true)).toBe('0s');
    });
});
