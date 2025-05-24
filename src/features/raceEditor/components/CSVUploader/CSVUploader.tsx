// src/CSVUploader.js
import React, { FC, useState, ChangeEvent } from 'react';
import Papa from 'papaparse';
import { Wrapper, Title, FileInput } from './CSVUploader.styles';
import { parseStringToSec } from '../../utils/parseStringToSec';
import { CSVUploaderProps } from './CSVUploader.types';

interface CSVDataItem {
    Name?: string;
    'No.'?: string;
    Laps?: string;
    'Elapsed Tm'?: string;
    'Lap Tm'?: string;
    [key: string]: string | undefined;
}

interface TeamData {
    [teamNumber: string]: {
        laps: Array<{
            lapTime: number;
            elapsedTime: number;
        }>;
        startGap: number;
        totalTimeWithGap: number;
        avgTimeTotal: number;
        isCountedLapAfterFinish: boolean;
        avgTimeCleanLapsOnly: number;
    };
}

const CSVUploader: FC<CSVUploaderProps> = (props) => {
    const { setTeamData } = props;

    const [csvData, setCsvData] = useState<CSVDataItem[] | null>(null);

    // Handle file upload
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];

        // Use PapaParse to parse the file
        Papa.parse(file, {
            complete: (result) => {
                console.log('Parsed Data:', result.data);

                const teamData: TeamData = {};
                let isAfterFinish = false;

                (result.data as CSVDataItem[]).forEach((dataItem) => {
                    if (dataItem['Name'] === 'Finish Flag') {
                        isAfterFinish = true;
                    }

                    if (dataItem['No.']) {
                        const teamNumber = dataItem['No.'];

                        const isValidTeamNumber =
                            Number(teamNumber) > 0 && Number(teamNumber) < 9999;

                        if (!isValidTeamNumber) {
                            return;
                        }

                        if (!teamData[teamNumber]) {
                            teamData[teamNumber] = {
                                laps: [],
                                startGap: 0,
                                totalTimeWithGap: 0,
                                avgTimeTotal: 0,
                                isCountedLapAfterFinish: false,

                                avgTimeCleanLapsOnly: 0,
                            };
                        }

                        if (dataItem['Laps'] === '0') {
                            teamData[teamNumber].startGap = parseStringToSec(
                                dataItem['Elapsed Tm'] || '0'
                            );
                        } else {
                            if (
                                !isAfterFinish ||
                                (isAfterFinish && !teamData[teamNumber].isCountedLapAfterFinish)
                            ) {
                                teamData[teamNumber].laps.push({
                                    lapTime: parseStringToSec(dataItem['Lap Tm'] || '0'),
                                    elapsedTime: parseStringToSec(dataItem['Elapsed Tm'] || '0'),
                                });
                                if (isAfterFinish) {
                                    teamData[teamNumber].isCountedLapAfterFinish = true;
                                }
                            }
                        }
                    }
                });

                console.log('%c * raceData raw', 'background: #000; color: aqua', teamData);

                setTeamData(teamData);

                setCsvData(result.data as CSVDataItem[]);
            },
            header: true, // Set this to true if you want to treat the first row as headers
            skipEmptyLines: true, // Skip empty lines in the CSV
        });
    };

    return (
        <Wrapper>
            <Title>Upload CSV File</Title>
            <FileInput type='file' accept='.csv' onChange={handleFileUpload} />
        </Wrapper>
    );
};

export default CSVUploader;
