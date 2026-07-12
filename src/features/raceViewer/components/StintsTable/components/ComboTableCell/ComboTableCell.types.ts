import { Dispatch, SetStateAction } from 'react';
import { StintFormatted } from '../../StintsTable.types';
import { MergedStintMarker } from '../../../../helpers/getMergedStintMarkers';

export interface ComboTableCellProps extends StintFormatted {
    minLapTime: number;
    minPitStopLapTime: number;
    stintMaxLimit: number;
    activeKart: string | null;
    setActiveKart: Dispatch<SetStateAction<string | null>>;
    fastestBest: boolean;
    fastestAvg: boolean;
    fastestPit: boolean;
    kartHasFixedNumber: boolean;
    mergedMarker?: MergedStintMarker;
}
