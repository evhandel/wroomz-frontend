import React from 'react';
import { useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useRaceData } from '../../data/useRaceData';
import { usePenaltiesByTeam } from './PenaltiesByTeam.data';
import { printPenaltyValue } from './PenaltiesByTeam.helpers';

const PenaltiesByTeam: React.FC = () => {
    const { id = '' } = useParams<{ id: string }>();
    const { data } = useRaceData(id);
    const penaltiesByTeam = usePenaltiesByTeam(id);

    if (!data || !data.results) {
        return <div>Loading penalties data...</div>;
    }

    const visibleEntries = Array.from(penaltiesByTeam.entries()).filter(
        ([, info]) => info.items.length > 0 || info.isDisqualified
    );

    return (
        <Box sx={{ px: { xs: 0, sm: 4 } }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Penalties
            </Typography>

            {visibleEntries.length === 0 ? (
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    No penalties
                </Typography>
            ) : (
                visibleEntries.map(([teamNumber, info]) => {
                    const result = data.results.find((r) => r.teamNumber === teamNumber);
                    const teamLabel = result?.teamLabel;
                    const pilots = result?.pilots ?? [];
                    const pilotsJoined = pilots.join(', ');

                    return (
                        <Accordion key={teamNumber} defaultExpanded={false}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        flexWrap: 'wrap',
                                        width: '100%',
                                    }}
                                >
                                    <Typography component="span" sx={{ fontWeight: 700 }}>
                                        {teamNumber}
                                    </Typography>
                                    <Typography
                                        component="span"
                                        sx={{ fontStyle: 'italic', opacity: 0.85 }}
                                    >
                                        {teamLabel ? (
                                            <Tooltip title={pilotsJoined} arrow>
                                                <span>{teamLabel}</span>
                                            </Tooltip>
                                        ) : (
                                            pilotsJoined
                                        )}
                                    </Typography>

                                    <Box sx={{ flex: 1 }} />

                                    {info.isDisqualified && (
                                        <Chip
                                            label="DSQ"
                                            color="error"
                                            size="small"
                                            sx={{ fontWeight: 700 }}
                                        />
                                    )}

                                    <Box sx={{ minWidth: 60, textAlign: 'right' }}>
                                        {printPenaltyValue(info.total)}
                                    </Box>
                                </Box>
                            </AccordionSummary>

                            <AccordionDetails>
                                {info.items.length === 0 ? (
                                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                        No penalty items
                                    </Typography>
                                ) : (
                                    <Stack spacing={1}>
                                        {info.items.map((p) => {
                                            const servedInRace = p.servedInRace === true;
                                            return (
                                                <Box
                                                    key={p.id}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1.5,
                                                        flexWrap: 'wrap',
                                                    }}
                                                >
                                                    <Typography
                                                        component="span"
                                                        sx={{ flex: 1, minWidth: 0 }}
                                                    >
                                                        {p.description}
                                                    </Typography>
                                                    {servedInRace && (
                                                        <Chip
                                                            label="Served in race"
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    )}
                                                    {!servedInRace && (
                                                        <Box
                                                            sx={{ minWidth: 60, textAlign: 'right' }}
                                                        >
                                                            {printPenaltyValue(p.seconds)}
                                                        </Box>
                                                    )}
                                                </Box>
                                            );
                                        })}
                                    </Stack>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    );
                })
            )}
        </Box>
    );
};

export default PenaltiesByTeam;
