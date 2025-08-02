// src/CSVUploader.js
import { RaceData } from '../Main/Main.types';

export interface CSVUploaderProps {
    setTeamData: (teamData: RaceData) => void;
}
