import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
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
        return { inputRef: ref, ...rest, size: 'small' as const, sx: { width: 120 }, type: 'number' };
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
                        <TextField {...registerField('minStintsQuantity')} type={'number'} aria-valuemax={40} />
                    </div>

                    <div>
                        <Label>Maximum stint, min</Label>
                        <TextField
                            {...registerField('maxStint')}
                            helperText="0 — disable this limit"
                        />
                    </div>

                    <FormControlLabel
                        control={<Switch {...register('mergeConsecutiveStintsForMax')} />}
                        label='Count consecutive stints of one pilot as one'
                    />

                    <div>
                        <Label>Minimum pilot rest between drives, min</Label>
                        <TextField {...registerField('minPilotRest')} helperText='0 — disable' />
                    </div>

                    {[2, 3, 4, 5, 6].map((size) => (
                        <div key={size}>
                            <Label>Minimum per pilot, team of {size}, min</Label>
                            <TextField
                                size='small'
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
                                helperText="0 — disable this limit"
                            />
                        </div>
                    ))}

                    <FormControlLabel
                        control={<Switch {...register('autoChargePenaltiesForLimits')} />}
                        label='Auto-charge penalties for limits'
                    />

                    <FormControlLabel
                        control={<Checkbox {...register('kartHasFixedNumber')} />}
                        label='Track has fixed kart numbers'
                    />
                </Stack>
            </form>
        </SectionWrapper>
    );
};

export default Settings;
