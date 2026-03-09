import React, { useState, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell } from '../../../raceViewer/components/StintsTable/StintsTable.styles';
import ComboTableCell from '../../../raceViewer/components/StintsTable/components/ComboTableCell/ComboTableCell';
import { getMinLapTime } from '../../../raceViewer/helpers/getMinLapTime';
import { useShallow } from 'zustand/react/shallow';
import { useRaceEditorStore } from '../../store/RaceEditorStoreProvider';
import { SectionWrapper, SectionHeader } from '../common/styles';

const EditorStintsTable: React.FC = () => {
    const { stintsAnalysis, results, settingsData } = useRaceEditorStore(
        useShallow((s) => ({
            stintsAnalysis: s.stintsAnalysis,
            results: s.results,
            settingsData: s.settingsData,
        }))
    );
    const [activeKart, setActiveKart] = useState<string | null>(null);

    const minLapTime = useMemo(() => getMinLapTime(stintsAnalysis), [stintsAnalysis]);

    const maxStint = Number(settingsData.maxStint);
    const minPitStopLapTime = Number(settingsData.minPitStopLapTime ?? '0');

    const stintRows = useMemo(() => {
        if (!stintsAnalysis || !results) return [];

        const maxStints = results.reduce((acc, result) => {
            const teamStints = stintsAnalysis[result.teamNumber]?.length ?? 0;
            return teamStints > acc ? teamStints : acc;
        }, 0);

        return Array.from({ length: maxStints }, (_, stintIndex) =>
            results.map((result) => ({
                ...(stintsAnalysis[result.teamNumber]?.[stintIndex] ?? null),
                teamNumber: result.teamNumber,
            }))
        );
    }, [stintsAnalysis, results]);

    const { fastestAvg, fastestPit } = useMemo(() => {
        let fAvg = 9999;
        let fPit = 9999;
        stintRows.forEach((row) => {
            row.forEach((stint) => {
                if (!stint?.laps?.length) return;
                if (stint.avgLapExcludingPitExitLap < fAvg) {
                    fAvg = stint.avgLapExcludingPitExitLap;
                }
                if (
                    stint.laps[0].time < fPit &&
                    stint.no > 1 &&
                    stint.laps[0].time >= minPitStopLapTime
                ) {
                    fPit = stint.laps[0].time;
                }
            });
        });
        return { fastestAvg: fAvg, fastestPit: fPit };
    }, [stintRows, minPitStopLapTime]);

    if (!stintsAnalysis || !results) return null;

    return (
        <SectionWrapper>
            <SectionHeader>Stint Statistics</SectionHeader>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Stint\Team</StyledTableCell>
                            {results.map((result) => (
                                <StyledTableCell key={result.teamNumber} align="center">
                                    <b>{result.teamNumber}</b>
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stintRows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    backgroundColor:
                                        index % 2 === 0
                                            ? (theme) => theme.custom.tableRowAlt
                                            : 'inherit',
                                }}
                            >
                                <StyledTableCell align="center">
                                    <b>{index + 1}</b>
                                </StyledTableCell>
                                {row.map((stint, teamIndex) =>
                                    stint?.laps?.length ? (
                                        <StyledTableCell key={teamIndex}>
                                            <ComboTableCell
                                                {...stint}
                                                minLapTime={minLapTime}
                                                minPitStopLapTime={minPitStopLapTime}
                                                fastestBest={stint.bestLap === minLapTime}
                                                fastestAvg={
                                                    stint.avgLapExcludingPitExitLap === fastestAvg
                                                }
                                                fastestPit={stint.laps[0].time === fastestPit}
                                                stintMaxLimit={maxStint}
                                                activeKart={activeKart}
                                                setActiveKart={setActiveKart}
                                            />
                                        </StyledTableCell>
                                    ) : (
                                        <StyledTableCell key={teamIndex} />
                                    )
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </SectionWrapper>
    );
};

export default EditorStintsTable;
