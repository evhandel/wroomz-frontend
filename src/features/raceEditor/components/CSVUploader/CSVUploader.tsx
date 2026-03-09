import { ChangeEvent, useCallback } from 'react';
import Papa from 'papaparse';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SectionWrapper, SectionHeader } from '../common/styles';
import { parseStringToSec } from '../../utils/parseStringToSec';
import { useShallow } from 'zustand/react/shallow';
import { useRaceEditorStore } from '../../store/RaceEditorStoreProvider';

interface CSVDataItem {
    Name?: string;
    'No.'?: string;
    Laps?: string;
    'Elapsed Tm'?: string;
    'Lap Tm'?: string;
    [key: string]: string | undefined;
}

interface TeamData {
    [teamNumber: string]: {
        laps: Array<{
            lapTime: number;
            elapsedTime: number;
        }>;
        startGap: number;
        totalTimeWithGap: number;
        avgTimeTotal: number;
        isCountedLapAfterFinish: boolean;
        avgTimeCleanLapsOnly: number;
    };
}

const CSVUploader = () => {
    const { raceData, setRaceData } = useRaceEditorStore(
        useShallow((s) => ({ raceData: s.raceData, setRaceData: s.setRaceData }))
    );
    const teamCount = Object.keys(raceData).length;

    // Handle file upload
    const handleFileUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];

        // Use PapaParse to parse the file
        Papa.parse(file, {
            complete: (result) => {
                const teamData: TeamData = {};
                let isAfterFinish = false;

                (result.data as CSVDataItem[]).forEach((dataItem) => {
                    if (dataItem['Name'] === 'Finish Flag') {
                        isAfterFinish = true;
                    }

                    if (dataItem['No.']) {
                        const teamNumber = dataItem['No.'];

                        const isValidTeamNumber =
                            Number(teamNumber) > 0 && Number(teamNumber) < 9999;

                        if (!isValidTeamNumber) {
                            return;
                        }

                        if (!teamData[teamNumber]) {
                            teamData[teamNumber] = {
                                laps: [],
                                startGap: 0,
                                totalTimeWithGap: 0,
                                avgTimeTotal: 0,
                                isCountedLapAfterFinish: false,

                                avgTimeCleanLapsOnly: 0,
                            };
                        }

                        if (dataItem['Laps'] === '0') {
                            teamData[teamNumber].startGap = parseStringToSec(
                                dataItem['Elapsed Tm'] || '0'
                            );
                        } else {
                            if (
                                !isAfterFinish ||
                                (isAfterFinish && !teamData[teamNumber].isCountedLapAfterFinish)
                            ) {
                                teamData[teamNumber].laps.push({
                                    lapTime: parseStringToSec(dataItem['Lap Tm'] || '0'),
                                    elapsedTime: parseStringToSec(dataItem['Elapsed Tm'] || '0'),
                                });
                                if (isAfterFinish) {
                                    teamData[teamNumber].isCountedLapAfterFinish = true;
                                }
                            }
                        }
                    }
                });

                setRaceData(teamData);
            },
            header: true, // Set this to true if you want to treat the first row as headers
            skipEmptyLines: true, // Skip empty lines in the CSV
        });
    }, [setRaceData]);

    return (
        <SectionWrapper>
            <SectionHeader>Upload CSV File</SectionHeader>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1.5 }}>
                <Button variant="outlined" component="label">
                    Choose CSV File
                    <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
                </Button>
                <Typography
                    variant="body2"
                    color={teamCount > 0 ? 'success.main' : 'warning.main'}
                >
                    {teamCount > 0 ? `Data loaded: ${teamCount} teams` : 'No CSV file uploaded'}
                </Typography>
            </Box>
        </SectionWrapper>
    );
};

export default CSVUploader;
