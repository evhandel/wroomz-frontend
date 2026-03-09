import { PenaltiesData } from '../Main/Main.types';

export interface PenaltiesProps {
    penaltiesManual: PenaltiesData;
    setPenaltiesManual: (penalties: PenaltiesData) => void;
}
