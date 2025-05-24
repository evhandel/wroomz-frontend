import { FC, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { SectionWrapper, SectionHeader, Label, Input } from '../common/styles';
import { SettingsData, SettingsProps } from './Settings.types';

const Settings: FC<SettingsProps> = (props) => {
    const { settingsData, setSettingsData } = props;
    const { register, control } = useForm<SettingsData>({
        defaultValues: settingsData,
    });

    const watchedValues = useWatch({ control });

    useEffect(() => {
        setSettingsData(watchedValues);
    }, [setSettingsData, watchedValues]);

    return (
        <SectionWrapper>
            <form>
                <SectionHeader>Settings</SectionHeader>
                <Label>
                    Minimum lap time with pit-stop, sec
                    <Input {...register('minPitStopLapTime')} />
                </Label>

                <Label>
                    Minimum stints quantity
                    <Input {...register('minStintsQuantity')} />
                </Label>

                <Label>
                    Maximum stint, min
                    <Input {...register('maxStint')} />
                </Label>

                <Label>
                    Minimum per pilot, team of 2 pilots, min
                    <Input {...register('minForPilotIfTwo')} />
                </Label>

                <Label>
                    Minimum per pilot, team of 3 pilots, min
                    <Input {...register('minForPilotIfThree')} />
                </Label>

                <Label>
                    Minimum per pilot, team of 4 pilots, min
                    <Input {...register('minForPilotIfFour')} />
                </Label>
            </form>
        </SectionWrapper>
    );
};

export default Settings;
