import CSVUploader from '../CSVUploader/CSVUploader';
import Settings from '../Settings/Settings';
import Results from '../Results/Results';
import ManualPenalties from '../ManualPenalties/ManualPenalties';
import { Grid } from './Main.styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Teams from '../Teams/Teams';
import StintsByPilots from '../StintsByPilots/StintsByPilots';
import AutoPenalties from '../AutoPenalties/AutoPenalties';
import EditorStintsTable from '../EditorStintsTable/EditorStintsTable';
import StintOverrides from '../StintOverrides/StintOverrides';
import { useShallow } from 'zustand/react/shallow';
import type { RaceResponse } from '@evhandel/wroomz-types';
import { EditorSnapshot } from '../../types';
import { RaceEditorProvider } from '../../store/RaceEditorStoreProvider';
import { useRaceEditorStore } from '../../store/RaceEditorStoreProvider';
import { useSnackbar } from '../../../../context/SnackbarContext';

interface MainProps {
    initialRaceData?: RaceResponse;
    onCalculate?: (snapshot: EditorSnapshot) => void;
}

const MainContent = () => {
    const { raceData, teams, results, calculate } = useRaceEditorStore(
        useShallow((s) => ({
            raceData: s.raceData,
            teams: s.teams,
            results: s.results,
            calculate: s.calculate,
        }))
    );
    const { showMessage } = useSnackbar();

    return (
        <Box sx={{ mt: 3 }}>
            <Grid>
                <CSVUploader />

                <Teams />

                <Settings />

                <ManualPenalties />
            </Grid>

            {teams && Boolean(teams.length) && <StintsByPilots />}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                    variant="contained"
                    disabled={Object.keys(raceData).length === 0}
                    onClick={() => calculate((msg) => showMessage(msg, 'warning'))}
                >
                    Calculate
                </Button>
            </Box>

            {results && (
                <>
                    <AutoPenalties />

                    <EditorStintsTable />

                    <StintOverrides />

                    <Results />
                </>
            )}
        </Box>
    );
};

const Main = ({ initialRaceData, onCalculate }: MainProps) => {
    return (
        <RaceEditorProvider initialRaceData={initialRaceData} onCalculate={onCalculate}>
            <MainContent />
        </RaceEditorProvider>
    );
};

export default Main;
