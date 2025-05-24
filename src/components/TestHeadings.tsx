import React from 'react';
import { Typography, Box } from '@mui/material';

export const TestHeadings = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant='h1'>This is an H1 heading</Typography>
            <Typography variant='h4' component='h1'>
                This is an H4 variant with H1 component
            </Typography>
            <Typography variant='h4'>This is a regular H4 heading</Typography>
        </Box>
    );
};
