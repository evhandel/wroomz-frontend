declare module '@mui/material/styles' {
    interface Theme {
        custom: {
            tableRowAlt: string;
            tableRowDefault: string;
            sectionBackground: string;
            chartGridColor: string;
        };
    }
    interface ThemeOptions {
        custom?: {
            tableRowAlt?: string;
            tableRowDefault?: string;
            sectionBackground?: string;
            chartGridColor?: string;
        };
    }
}

export {};
