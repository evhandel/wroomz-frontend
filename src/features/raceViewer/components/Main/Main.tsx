import React from 'react';
import LapTimesChart from '../LapTimesChart/LapTimesChart';
import Results from '../Results/Results';
import DeltaTimesChart from '../DeltaTimesChart/DeltaTimesChart';
import StintsTable from '../StintsTable/StintsTable';
import LapsTable from '../LapsTable/LapsTable';
import PenaltiesTable from '../PenaltiesTable/PenaltiesTable';
import { useParams } from 'react-router-dom';

const Main: React.FC = () => {
    const { id = '1' } = useParams<{ id: string }>(); // Default to '1' if no ID is provided
    
    return (
        <div>
            <Results raceId={id} />

            <br />
            <StintsTable />
            <br />
            <br />

            <PenaltiesTable />

            <br />
            <br />

            <DeltaTimesChart />
            <br />
            <br />
            <LapTimesChart />

            <br />
            <br />
            <LapsTable />
        </div>
    );
};

export default Main;
