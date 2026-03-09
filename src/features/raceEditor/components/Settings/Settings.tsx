import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { SectionWrapper, SectionHeader, Label } from '../common/styles';
import { SettingsData } from './Settings.types';
import { useShallow } from 'zustand/react/shallow';
import { useRaceEditorStore } from '../../store/RaceEditorStoreProvider';

const Settings = () => {
    const { settingsData, setSettingsData } = useRaceEditorStore(
        useShallow((s) => ({ settingsData: s.settingsData, setSettingsData: s.setSettingsData }))
    );
    const { register, control } = useForm<SettingsData>({
        defaultValues: settingsData,
    });

    const registerField = (name: keyof SettingsData) => {
        const { ref, ...rest } = register(name);
        return { inputRef: ref, ...rest, size: 'small' as const, sx: { width: 120 } };
    };

    const watchedValues = useWatch({ control });

    useEffect(() => {
        setSettingsData(watchedValues as SettingsData);
    }, [setSettingsData, watchedValues]);

    return (
        <SectionWrapper>
            <form>
                <SectionHeader>Settings</SectionHeader>
                <Stack spacing={2}>
                    <div>
                        <Label>Pit-stop detection lap time, sec</Label>
                        <TextField {...registerField('pitStopDetectionTime')} />
                    </div>

                    <div>
                        <Label>Minimum lap time with pit-stop, sec</Label>
                        <TextField {...registerField('minPitStopLapTime')} />
                    </div>

                    <div>
                        <Label>Minimum stints quantity</Label>
                        <TextField {...registerField('minStintsQuantity')} />
                    </div>

                    <div>
                        <Label>Maximum stint, min</Label>
                        <TextField {...registerField('maxStint')} />
                    </div>

                    {[2, 3, 4, 5, 6].map((size) => (
                        <div key={size}>
                            <Label>Minimum per pilot, team of {size}, min</Label>
                            <TextField
                                size="small"
                                sx={{ width: 120 }}
                                value={settingsData.minForPilotByTeamSize?.[size] ?? ''}
                                onChange={(e) =>
                                    setSettingsData((prev) => ({
                                        ...prev,
                                        minForPilotByTeamSize: {
                                            ...prev.minForPilotByTeamSize,
                                            [size]: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </div>
                    ))}
                </Stack>
            </form>
        </SectionWrapper>
    );
};

export default Settings;
