import './theme.types';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    custom: {
        tableRowAlt: 'rgb(28, 25, 23)',
        tableRowDefault: '#060606',
        sectionBackground: 'rgb(28, 25, 23)',
        chartGridColor: 'rgb(28, 25, 23)',
    },
    palette: {
        mode: 'dark',
        background: {
            default: '#050505',
            paper: '#121212',
        },
        primary: {
            main: '#90CAF9',
        },
        secondary: {
            main: '#F48FB1',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#AAAAAA',
        },
    },
    typography: {
        fontFamily:
            '"Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        h1: {
            fontWeight: 700,
            fontStyle: 'italic',
        },
        h4: {
            fontWeight: 700,
            fontStyle: 'italic',
        },
        h6: {
            // For race names in the list
            fontWeight: 400,
            fontStyle: 'italic',
            marginBottom: 0,
        },
        body2: {
            // For metadata text in race listings
            fontStyle: 'italic',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.MuiButton-colorInherit': {
                        fontWeight: 700,
                        fontStyle: 'italic',
                    },
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: '0px !important',
                    paddingRight: '0px !important',
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    '&:last-child': {
                        paddingBottom: '16px',
                    },
                },
            },
        },
    },
});
