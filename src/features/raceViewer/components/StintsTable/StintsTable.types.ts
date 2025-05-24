import { StintAlalysisData } from '../../data/stintsAnalysis';
import { Dispatch, SetStateAction } from 'react';

export interface StintFormatted extends StintAlalysisData {
    teamNumber: string;
}
