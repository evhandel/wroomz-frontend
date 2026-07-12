import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { SectionHeader } from '../common/styles';
import { SectionWrapper } from './StintsByPilots.styles';
import { OPTIONAL_STINTS_COUNT } from './StintsByPilots.constants';
import { ActiveCell, NavDirection } from './StintsByPilots.types';
import StintRow from './StintRow';
import {
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Tooltip,
    FormControlLabel,
    Switch,
    Button,
    Stack,
} from '@mui/material';
import { useRaceEditorStore } from '../../store/RaceEditorStoreProvider';
import { downloadText } from '../../utils/downloadFile';
import { formatLiveLogAsText, LIVE_LOG_TEXT_FILENAME } from '../../utils/formatLiveLog';

const StintsByPilots = () => {
    const teams = useRaceEditorStore((s) => s.teams);
    const stintsQuantity = useRaceEditorStore((s) => Number(s.settingsData.minStintsQuantity));
    const kartHasFixedNumber = useRaceEditorStore(
        (s) => s.settingsData.kartHasFixedNumber ?? true
    );
    const liveMode = useRaceEditorStore((s) => s.liveMode);
    const setLiveMode = useRaceEditorStore((s) => s.setLiveMode);
    const liveLog = useRaceEditorStore((s) => s.liveLog);
    const recordChangeover = useRaceEditorStore((s) => s.recordChangeover);
    const clearLiveLog = useRaceEditorStore((s) => s.clearLiveLog);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<ActiveCell | null>(null);
    const activeRef = useRef<ActiveCell | null>(null);
    activeRef.current = active;

    const totalStints = stintsQuantity + OPTIONAL_STINTS_COUNT;
    const stints = Array.from({ length: totalStints }, (_, i) => i + 1);

    const focusCell = useCallback((team: string, stintIndex: number) => {
        const el = wrapperRef.current?.querySelector<HTMLElement>(
            `[data-team="${CSS.escape(team)}"][data-stint="${stintIndex}"]`
        );
        el?.focus();
    }, []);

    const onActivate = useCallback((team: string, stintIndex: number) => {
        setActive({ team, stintIndex });
    }, []);

    const onClose = useCallback(() => {
        const prev = activeRef.current;
        flushSync(() => setActive(null));
        if (prev) focusCell(prev.team, prev.stintIndex);
    }, [focusCell]);

    const onNavigate = useCallback(
        (direction: NavDirection, team: string, stintIndex: number) => {
            const teamNames = teams.map((t) => t.name);
            const col = teamNames.indexOf(team);
            if (col === -1) return;
            let nextCol = col;
            let nextStint = stintIndex;
            if (direction === 'up') nextStint = Math.max(0, stintIndex - 1);
            else if (direction === 'down') nextStint = Math.min(totalStints - 1, stintIndex + 1);
            else if (direction === 'left') nextCol = Math.max(0, col - 1);
            else if (direction === 'right') nextCol = Math.min(teamNames.length - 1, col + 1);
            focusCell(teamNames[nextCol], nextStint);
        },
        [teams, totalStints, focusCell]
    );

    useEffect(() => {
        if (!active) return;
        const onDocMouseDown = (e: MouseEvent) => {
            const target = e.target as Element | null;
            if (!target) return;
            // Keep open when interacting with the pilot dropdown (portal-rendered).
            if (target.closest('.MuiPopover-root, .MuiMenu-root, .MuiModal-root')) return;
            // Keep open only when clicking inside the active cell's editor itself;
            // any other click (other cells, table chrome, outside) deactivates.
            const editor = wrapperRef.current?.querySelector('[data-active-editor="true"]');
            if (editor?.contains(target)) return;
            setActive(null);
        };
        document.addEventListener('mousedown', onDocMouseDown);
        return () => document.removeEventListener('mousedown', onDocMouseDown);
    }, [active]);

    const prevActiveRef = useRef<ActiveCell | null>(null);
    useEffect(() => {
        const prev = prevActiveRef.current;
        prevActiveRef.current = active;
        if (!prev) return;
        const stillActive =
            active !== null &&
            active.team === prev.team &&
            active.stintIndex === prev.stintIndex;
        if (stillActive) return;
        if (liveMode) recordChangeover(prev.team, prev.stintIndex);
    }, [active, liveMode, recordChangeover]);

    const prevLogLenRef = useRef(liveLog.length);
    useEffect(() => {
        if (liveMode && liveLog.length > prevLogLenRef.current) {
            downloadText(LIVE_LOG_TEXT_FILENAME, formatLiveLogAsText(liveLog));
        }
        prevLogLenRef.current = liveLog.length;
    }, [liveLog, liveMode]);

    return (
        <SectionWrapper ref={wrapperRef}>
            <SectionHeader>Stints by Pilots</SectionHeader>
            <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{ mb: 1 }}
            >
                <FormControlLabel
                    control={
                        <Switch
                            checked={liveMode}
                            onChange={(e) => setLiveMode(e.target.checked)}
                        />
                    }
                    label='Live mode'
                />
                {liveMode && liveLog.length > 0 && (
                    <>
                        <Button
                            size='small'
                            variant='outlined'
                            onClick={() =>
                                downloadText(
                                    LIVE_LOG_TEXT_FILENAME,
                                    formatLiveLogAsText(liveLog)
                                )
                            }
                        >
                            Download log
                        </Button>
                        <Button size='small' color='error' onClick={() => clearLiveLog()}>
                            Clear
                        </Button>
                    </>
                )}
            </Stack>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Stint No</b>
                            </TableCell>
                            {teams.map((team) => {
                                const fullText = team.teamLabel || team.pilots.join(', ');
                                const shortText =
                                    fullText.length > 5 ? fullText.slice(0, 5) + '…' : fullText;
                                return (
                                    <TableCell key={team.name}>
                                        <Tooltip title={fullText} arrow>
                                            <span>
                                                <b>{team.name}</b>
                                                <div
                                                    style={{
                                                        fontSize: '0.75em',
                                                        fontWeight: 'normal',
                                                    }}
                                                >
                                                    {shortText}
                                                </div>
                                            </span>
                                        </Tooltip>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stints.map((stint) => {
                            const stintIndex = stint - 1;
                            return (
                                <StintRow
                                    key={stint}
                                    stintNumber={stint}
                                    isOptional={stint > stintsQuantity}
                                    isRequired={stint <= stintsQuantity}
                                    teams={teams}
                                    kartHasFixedNumber={kartHasFixedNumber}
                                    activeTeam={
                                        active && active.stintIndex === stintIndex
                                            ? active.team
                                            : null
                                    }
                                    onActivate={onActivate}
                                    onClose={onClose}
                                    onNavigate={onNavigate}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </SectionWrapper>
    );
};

export default StintsByPilots;
