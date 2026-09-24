import { fireEvent, render, screen } from '@testing-library/react';
import Settings from './Settings';
import { defaultSettingsData } from './Settings.constants';
import { RaceEditorProvider } from '../../store/RaceEditorStoreProvider';
import { LS_KEY_SETTINGS } from '../../context/raceEditorReducer';

const label = 'Count consecutive stints of one pilot as one';

const renderSettings = (mergeConsecutiveStintsForMax?: boolean) => {
    localStorage.setItem(
        LS_KEY_SETTINGS,
        JSON.stringify({ ...defaultSettingsData, mergeConsecutiveStintsForMax })
    );
    return render(
        <RaceEditorProvider>
            <Settings />
        </RaceEditorProvider>
    );
};

const savedMergeSetting = () =>
    JSON.parse(localStorage.getItem(LS_KEY_SETTINGS)!).mergeConsecutiveStintsForMax;

describe('consecutive stint setting', () => {
    beforeEach(() => localStorage.clear());

    it('shows the saved enabled state and saves false when switched off', () => {
        renderSettings(true);
        const toggle = screen.getByRole('checkbox', { name: label });

        expect(toggle).toBeChecked();
        expect(toggle.closest('.MuiSwitch-switchBase')).toHaveClass('Mui-checked');

        fireEvent.click(toggle);

        expect(toggle).not.toBeChecked();
        expect(toggle.closest('.MuiSwitch-switchBase')).not.toHaveClass('Mui-checked');
        expect(savedMergeSetting()).toBe(false);
    });

    it.each([false, undefined])('starts disabled for %s and saves both toggle states', (value) => {
        renderSettings(value);
        const toggle = screen.getByRole('checkbox', { name: label });

        expect(toggle).not.toBeChecked();
        expect(toggle.closest('.MuiSwitch-switchBase')).not.toHaveClass('Mui-checked');

        fireEvent.click(toggle);
        expect(toggle).toBeChecked();
        expect(savedMergeSetting()).toBe(true);

        fireEvent.click(toggle);
        expect(toggle).not.toBeChecked();
        expect(savedMergeSetting()).toBe(false);
    });
});
