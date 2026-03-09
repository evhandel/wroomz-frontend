import React, { useMemo, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { SectionWrapper, SectionHeader, Label } from '../common/styles';
import { SplitItem, IgnoredText, ManualBadge } from './StintOverrides.styles';
import { useShallow } from 'zustand/react/shallow';
import { useRaceEditorStore } from '../../store/RaceEditorStoreProvider';
import { formatTime } from '../../../raceViewer/helpers/format';

interface LapOption {
    lapNumber: number;
    lapTime: number;
    label: string;
}

const TeamOverrides: React.FC<{ teamNumber: string }> = ({ teamNumber }) => {
    const { raceData, settingsData, stintOverrides, setStintOverrideForTeam } =
        useRaceEditorStore(
            useShallow((s) => ({
                raceData: s.raceData,
                settingsData: s.settingsData,
                stintOverrides: s.stintOverrides,
                setStintOverrideForTeam: s.setStintOverrideForTeam,
            }))
        );

    const laps = raceData[teamNumber]?.laps ?? [];
    const pitStopDetectionTime = +(settingsData.pitStopDetectionTime ?? '0');

    // Auto-detected split points (lap numbers where lapTime >= threshold)
    const autoSplitLaps = useMemo(() => {
        const splits: number[] = [];
        laps.forEach((lap, index) => {
            if (index > 0 && lap.lapTime >= pitStopDetectionTime) {
                splits.push(index + 1);
            }
        });
        return splits;
    }, [laps, pitStopDetectionTime]);

    const teamOverride = stintOverrides[teamNumber];
    // Determine which auto-splits are currently ignored
    const ignoredAutoSplits = useMemo(() => {
        if (!teamOverride) return new Set<number>();
        const overrideSet = new Set(teamOverride);
        return new Set(autoSplitLaps.filter((lap) => !overrideSet.has(lap)));
    }, [teamOverride, autoSplitLaps]);

    // Manual force-splits (in override but not in auto)
    const manualSplits = useMemo(() => {
        if (!teamOverride) return [];
        const autoSet = new Set(autoSplitLaps);
        return teamOverride.filter((lap) => lap !== 1 && !autoSet.has(lap));
    }, [teamOverride, autoSplitLaps]);

    const hasOverride = teamOverride !== undefined;

    const toggleIgnoreAutoSplit = (lapNumber: number) => {
        // Get current effective split laps
        let currentSplits: number[];
        if (teamOverride) {
            currentSplits = [...teamOverride];
        } else {
            currentSplits = [1, ...autoSplitLaps];
        }

        if (ignoredAutoSplits.has(lapNumber)) {
            // Re-add this auto split
            currentSplits.push(lapNumber);
            currentSplits.sort((a, b) => a - b);
        } else {
            // Remove this auto split
            currentSplits = currentSplits.filter((l) => l !== lapNumber);
        }

        // Check if identical to auto
        const autoFull = [1, ...autoSplitLaps];
        const isIdentical =
            currentSplits.length === autoFull.length &&
            currentSplits.every((v, i) => v === autoFull[i]);

        setStintOverrideForTeam(teamNumber, isIdentical ? undefined : currentSplits);
    };

    const removeManualSplit = (lapNumber: number) => {
        if (!teamOverride) return;
        const newSplits = teamOverride.filter((l) => l !== lapNumber);

        const autoFull = [1, ...autoSplitLaps];
        const isIdentical =
            newSplits.length === autoFull.length && newSplits.every((v, i) => v === autoFull[i]);

        setStintOverrideForTeam(teamNumber, isIdentical ? undefined : newSplits);
    };

    // Options for adding a manual split
    const availableLapOptions: LapOption[] = useMemo(() => {
        const currentSplits = teamOverride ? new Set(teamOverride) : new Set([1, ...autoSplitLaps]);
        return laps
            .map((lap, index) => ({
                lapNumber: index + 1,
                lapTime: lap.lapTime,
                label: `Lap ${index + 1} — ${formatTime(lap.lapTime)}`,
            }))
            .filter((opt) => opt.lapNumber !== 1 && !currentSplits.has(opt.lapNumber));
    }, [laps, teamOverride, autoSplitLaps]);

    const [addingSplit, setAddingSplit] = useState(false);

    const handleAddSplit = (option: LapOption | null) => {
        if (!option) return;
        let currentSplits: number[];
        if (teamOverride) {
            currentSplits = [...teamOverride, option.lapNumber];
        } else {
            currentSplits = [1, ...autoSplitLaps, option.lapNumber];
        }
        currentSplits.sort((a, b) => a - b);
        setStintOverrideForTeam(teamNumber, currentSplits);
        setAddingSplit(false);
    };

    return (
        <Box>
            <Label>
                Auto-detected splits:
                {hasOverride && (
                    <ManualBadge style={{ marginLeft: 8 }}>(overridden)</ManualBadge>
                )}
            </Label>

            {autoSplitLaps.length === 0 && (
                <Typography variant="body2" sx={{ opacity: 0.5, mb: 1 }}>
                    No auto-detected splits
                </Typography>
            )}

            {autoSplitLaps.map((lapNumber) => {
                const lap = laps[lapNumber - 1];
                const isIgnored = ignoredAutoSplits.has(lapNumber);
                return (
                    <SplitItem key={lapNumber}>
                        {isIgnored ? (
                            <>
                                <IgnoredText>
                                    Lap {lapNumber} — {formatTime(lap.lapTime)}
                                </IgnoredText>
                                <IconButton
                                    size="small"
                                    onClick={() => toggleIgnoreAutoSplit(lapNumber)}
                                    title="Restore"
                                >
                                    <UndoIcon fontSize="small" />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <span>
                                    Lap {lapNumber} — {formatTime(lap.lapTime)}
                                </span>
                                <IconButton
                                    size="small"
                                    onClick={() => toggleIgnoreAutoSplit(lapNumber)}
                                    title="Ignore this split"
                                    color="warning"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </>
                        )}
                    </SplitItem>
                );
            })}

            {manualSplits.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Label>Manual splits:</Label>
                    {manualSplits.map((lapNumber) => {
                        const lap = laps[lapNumber - 1];
                        return (
                            <SplitItem key={lapNumber}>
                                <Chip label="manual" size="small" color="warning" variant="outlined" />
                                <span>
                                    Lap {lapNumber} — {formatTime(lap.lapTime)}
                                </span>
                                <IconButton
                                    size="small"
                                    onClick={() => removeManualSplit(lapNumber)}
                                    title="Remove"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </SplitItem>
                        );
                    })}
                </Box>
            )}

            <Box sx={{ mt: 2 }}>
                {addingSplit ? (
                    <Autocomplete
                        options={availableLapOptions}
                        getOptionLabel={(opt) => opt.label}
                        onChange={(_, value) => handleAddSplit(value)}
                        onClose={() => setAddingSplit(false)}
                        open
                        size="small"
                        sx={{ maxWidth: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Select lap to split at" autoFocus />
                        )}
                    />
                ) : (
                    <Button size="small" variant="outlined" onClick={() => setAddingSplit(true)}>
                        + Add split
                    </Button>
                )}
            </Box>
        </Box>
    );
};

const StintOverrides: React.FC = () => {
    const { stintsAnalysis, results } = useRaceEditorStore(
        useShallow((s) => ({ stintsAnalysis: s.stintsAnalysis, results: s.results }))
    );

    if (!stintsAnalysis || !results) return null;

    return (
        <SectionWrapper>
            <SectionHeader>Stint Overrides</SectionHeader>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
                Override auto-detected stint splits. After changes, click Calculate again.
            </Typography>
            {results.map((result) => (
                <Accordion key={result.teamNumber} defaultExpanded={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>
                            Team {result.teamNumber}
                            {' — '}
                            {stintsAnalysis[result.teamNumber]?.length ?? 0} stints
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TeamOverrides teamNumber={result.teamNumber} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </SectionWrapper>
    );
};

export default StintOverrides;
