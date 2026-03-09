export interface SettingsProps {
    settingsData: SettingsData;
    setSettingsData: React.Dispatch<React.SetStateAction<SettingsData>>;
}

export interface SettingsData {
    pitStopDetectionTime?: string;
    minPitStopLapTime?: string;
    maxStint?: string;
    minForPilotByTeamSize?: Record<number, string>;
    minStintsQuantity?: string;
}
