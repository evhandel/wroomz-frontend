import { SettingsData } from './Settings.types';

export const defaultSettingsData: SettingsData = {
    maxStint: '30',
    minStintsQuantity: '6',
    pitStopDetectionTime: '120',
    minPitStopLapTime: '90',
    minForPilotByTeamSize: {
        2: '20',
        3: '60',
        4: '40',
        5: '30',
        6: '25',
    },
};
