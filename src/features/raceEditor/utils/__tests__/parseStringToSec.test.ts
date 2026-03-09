import { parseStringToSec } from '../parseStringToSec';

describe('parseStringToSec', () => {
    it('parses mm:ss format', () => {
        expect(parseStringToSec('1:30')).toBe(90);
    });

    it('parses hh:mm:ss format', () => {
        expect(parseStringToSec('1:02:30')).toBe(3750);
    });

    it('parses plain number string', () => {
        expect(parseStringToSec('45.5')).toBe(45.5);
    });

    it('parses mm:ss.ms with decimal seconds', () => {
        expect(parseStringToSec('1:05.123')).toBeCloseTo(65.123);
    });
});
