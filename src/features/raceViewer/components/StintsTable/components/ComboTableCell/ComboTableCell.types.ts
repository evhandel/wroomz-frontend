import { Dispatch, SetStateAction } from 'react';
import { StintFormatted } from '../../StintsTable.types';

export interface ComboTableCellProps extends StintFormatted {
    minLapTime: number;
    stintMaxLimit: number;
    activeKart: string | null;
    setActiveKart: Dispatch<SetStateAction<string | null>>;
    fastestBest: boolean;
    fastestAvg: boolean;
    fastestPit: boolean;
}
