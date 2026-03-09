import Box from '@mui/material/Box';
import { SectionWrapper, Label, SectionHeader } from '../common/styles';
import PenaltyList from '../../../../components/PenaltyList';
import { useShallow } from 'zustand/react/shallow';
import { useRaceEditorStore } from '../../store/RaceEditorStoreProvider';

const AutoPenalties = () => {
    const { penaltiesByPilotLimit, penaltiesByStintLimit } = useRaceEditorStore(
        useShallow((s) => ({
            penaltiesByPilotLimit: s.penaltiesByPilotLimit,
            penaltiesByStintLimit: s.penaltiesByStintLimit,
        }))
    );

    const hasPenaltiesByPilotLimit = Object.values(penaltiesByPilotLimit).some(
        (value) => value > 0
    );
    const hasPenaltiesByStintLimit = Object.values(penaltiesByStintLimit).some(
        (value) => value > 0
    );

    return (
        <SectionWrapper>
            <SectionHeader>Penalties</SectionHeader>
            <Label>By stints limit</Label>
            {!hasPenaltiesByStintLimit && <Label>No penalties</Label>}

            <Label>
                <PenaltyList penalties={penaltiesByStintLimit} skipZeroes />
            </Label>
            <Box sx={{ mt: 1 }} />
            <Label>By limit on pilot </Label>
            {!hasPenaltiesByPilotLimit && <Label>No penalties</Label>}

            <Label>
                <PenaltyList penalties={penaltiesByPilotLimit} skipZeroes />
            </Label>
        </SectionWrapper>
    );
};

export default AutoPenalties;
