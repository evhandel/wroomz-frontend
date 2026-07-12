import { memo, useCallback, useEffect, useState, KeyboardEvent } from 'react';
import { Select, MenuItem, TextField, Button } from '@mui/material';
import { Flex } from '../common/styles';
import { Box, DisplayCell, DisplayDelButton, KartTag } from './StintsByPilots.styles';
import { StintCellProps } from './StintsByPilots.types';
import { useRaceEditorStore } from '../../store/RaceEditorStoreProvider';

const NAV_KEYS: Record<string, 'up' | 'down' | 'left' | 'right'> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
};

const StintCell = memo<StintCellProps>(
    ({
        team,
        pilots,
        stintIndex,
        isRequired,
        kartHasFixedNumber,
        isActive,
        onActivate,
        onClose,
        onNavigate,
    }) => {
        const cell = useRaceEditorStore((s) => s.stintsByPilots[team]?.[stintIndex]);
        const updateStintCell = useRaceEditorStore((s) => s.updateStintCell);
        const clearStintCell = useRaceEditorStore((s) => s.clearStintCell);

        // Open the pilot dropdown one frame after the cell is activated, so a
        // single click both activates the cell and opens the select. Deferring
        // to the next frame avoids the activating click immediately closing it.
        const [pilotOpen, setPilotOpen] = useState(false);
        useEffect(() => {
            if (!isActive) {
                setPilotOpen(false);
                return;
            }
            const id = requestAnimationFrame(() => setPilotOpen(true));
            return () => cancelAnimationFrame(id);
        }, [isActive]);

        const pilot = cell?.pilot ?? '';
        const kart = cell?.kart ?? '';
        const missingPilot = isRequired && !pilot;
        const missingKart = isRequired && kartHasFixedNumber && !kart;
        const hasError = missingPilot || missingKart;

        const activate = useCallback(
            () => onActivate(team, stintIndex),
            [onActivate, team, stintIndex]
        );

        const hasData = Boolean(pilot || kart);

        if (!isActive) {
            const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
                // Ignore key events bubbling up from the inner Del button.
                if (e.target !== e.currentTarget) return;
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activate();
                    return;
                }
                const direction = NAV_KEYS[e.key];
                if (direction) {
                    e.preventDefault();
                    onNavigate(direction, team, stintIndex);
                }
            };
            return (
                <DisplayCell
                    role='button'
                    tabIndex={0}
                    hasError={hasError}
                    isEmpty={!pilot}
                    data-team={team}
                    data-stint={stintIndex}
                    onClick={activate}
                    onKeyDown={onKeyDown}
                >
                    {pilot ? (
                        <>
                            <span>{pilot}</span>
                            {kartHasFixedNumber && (
                                <KartTag>{kart ? `#${kart}` : '#?'}</KartTag>
                            )}
                        </>
                    ) : (
                        <span>{isRequired ? '—' : '+'}</span>
                    )}
                    {hasData && (
                        <DisplayDelButton
                            type='button'
                            tabIndex={-1}
                            aria-label='Clear stint'
                            title='Clear stint'
                            onClick={(e) => {
                                e.stopPropagation();
                                clearStintCell(team, stintIndex);
                            }}
                        >
                            ×
                        </DisplayDelButton>
                    )}
                </DisplayCell>
            );
        }

        const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        return (
            <div data-active-editor='true' onKeyDown={onKeyDown}>
                <Select
                    autoFocus
                    open={pilotOpen}
                    onOpen={() => setPilotOpen(true)}
                    onClose={() => setPilotOpen(false)}
                    variant='outlined'
                    value={pilot}
                    error={missingPilot}
                    onChange={(e) =>
                        updateStintCell(team, stintIndex, { pilot: e.target.value as string })
                    }
                    sx={{ width: 150 }}
                    size='small'
                    autoWidth={false}
                >
                    {pilots.map((p) => (
                        <MenuItem key={p} value={p}>
                            {p}
                        </MenuItem>
                    ))}
                </Select>
                <Box />
                <Flex>
                    {kartHasFixedNumber && (
                        <>
                            <span>Kart No </span>
                            <TextField
                                variant='outlined'
                                placeholder='No'
                                size='small'
                                sx={{
                                    width: 50,
                                    '& .MuiOutlinedInput-input': { px: 1 },
                                }}
                                disabled={!pilot}
                                value={kart}
                                error={missingKart}
                                onChange={(e) =>
                                    updateStintCell(team, stintIndex, { kart: e.target.value })
                                }
                            />
                        </>
                    )}
                    {(pilot || kart) && (
                        <Button onClick={() => clearStintCell(team, stintIndex)}>Del</Button>
                    )}
                </Flex>
            </div>
        );
    }
);

export default StintCell;
