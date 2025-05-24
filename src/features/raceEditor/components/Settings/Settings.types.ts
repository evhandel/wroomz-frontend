export interface SettingsProps {
    settingsData: SettingsData;
    setSettingsData: React.Dispatch<React.SetStateAction<SettingsData>>;
}

export interface SettingsData {
    minPitStopLapTime?: string;
    maxStint?: string;
    minForPilotIfTwo?: string;
    minForPilotIfThree?: string;
    minForPilotIfFour?: string;
    minStintsQuantity?: string;
}
