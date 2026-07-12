import { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Penalty, PenaltySource } from '@evhandel/wroomz-types';

interface SourceChipDescriptor {
    label: string;
    color: 'default' | 'info' | 'secondary' | 'warning';
}

const SOURCE_CHIP: Record<PenaltySource, SourceChipDescriptor> = {
    manual: { label: 'Manual', color: 'default' },
    stintLimit: { label: 'Stint limit', color: 'info' },
    pilotLimit: { label: 'Pilot limit', color: 'secondary' },
    minRest: { label: 'Min rest', color: 'warning' },
};

interface PenaltyRowProps {
    penalty: Penalty;
    onUpdateSeconds: (id: string, seconds: number) => void;
    onSetServedInRace: (id: string, value: boolean) => void;
    onDelete: (id: string) => void;
}

const PenaltyRow = ({ penalty, onUpdateSeconds, onSetServedInRace, onDelete }: PenaltyRowProps) => {
    const [draft, setDraft] = useState<string>(String(penalty.seconds));

    useEffect(() => {
        setDraft(String(penalty.seconds));
    }, [penalty.seconds]);

    const commit = useCallback(() => {
        const parsed = Number(draft);
        if (!Number.isFinite(parsed)) {
            setDraft(String(penalty.seconds));
            return;
        }
        if (parsed === penalty.seconds) return;
        onUpdateSeconds(penalty.id, parsed);
    }, [draft, penalty.id, penalty.seconds, onUpdateSeconds]);

    const cancel = useCallback(() => {
        setDraft(String(penalty.seconds));
    }, [penalty.seconds]);

    const sourceChip = SOURCE_CHIP[penalty.source];

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                py: 1,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                flexWrap: 'wrap',
            }}
        >
            <Chip
                label={sourceChip.label}
                size="small"
                variant="outlined"
                color={sourceChip.color}
            />
            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 48 }}>
                #{penalty.teamNumber}
            </Typography>
            <Typography
                variant="body2"
                sx={{ flex: '1 1 200px', opacity: 0.85, wordBreak: 'break-word' }}
            >
                {penalty.description}
            </Typography>
            <FormControlLabel
                sx={{ ml: 0 }}
                control={
                    <Switch
                        size="small"
                        checked={penalty.servedInRace === true}
                        onChange={(e) =>
                            onSetServedInRace(penalty.id, e.target.checked)
                        }
                    />
                }
                label="Served in race"
            />
            {!penalty.servedInRace && (
                <TextField
                    type="number"
                    size="small"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={commit}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            (e.target as HTMLInputElement).blur();
                        } else if (e.key === 'Escape') {
                            cancel();
                            (e.target as HTMLInputElement).blur();
                        }
                    }}
                    sx={{ width: 100 }}
                    inputProps={{ 'aria-label': 'seconds' }}
                />
            )}
            {!penalty.servedInRace && penalty.userEditedSeconds && (
                <Chip
                    label="manually edited"
                    size="small"
                    variant="outlined"
                    color="warning"
                />
            )}
            <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(penalty.id)}
                title="Delete"
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default PenaltyRow;
