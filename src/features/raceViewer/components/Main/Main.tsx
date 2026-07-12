import React from 'react';
import { Stack } from '@mui/material';
import LapTimesChart from '../LapTimesChart/LapTimesChart';
import Results from '../Results/Results';
import DeltaTimesChart from '../DeltaTimesChart/DeltaTimesChart';
import StintsTable from '../StintsTable/StintsTable';
import LapsTable from '../LapsTable/LapsTable';
import PenaltiesByTeam from '../PenaltiesTable/PenaltiesByTeam';
import { useParams } from 'react-router-dom';

const Main: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) return null;

    return (
        <Stack spacing={4}>
            <Results raceId={id} />
            <StintsTable />
            <PenaltiesByTeam />
            <DeltaTimesChart />
            <LapTimesChart />
            <LapsTable />
        </Stack>
    );
};

export default Main;
