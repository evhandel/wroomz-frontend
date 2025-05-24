// src/CSVUploader.js
import React, { useState } from 'react';
import Papa from 'papaparse';
import { Wrapper, Title, FileInput } from './CSVUploader.styles';
import { parseStringToSec } from '../../utils/parseStringToSec';
import { RaceData } from '../Main/Main.types';

export interface CSVUploaderProps {
    setTeamData: (teamData: RaceData) => void;
}
