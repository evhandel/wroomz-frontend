import './Main.css';
import CSVUploader from '../CSVUploader/CSVUploader';
import Settings from '../Settings/Settings';
import { useState } from 'react';
import {
    PenaltiesData,
    ResultsData,
    RaceData,
    TeamDataExtended,
    StintsByPilotsData,
} from './Main.types';
import Results from '../Results/Results';
import ManualPenalties from '../ManualPenalties/ManualPenalties';
import { Flex } from './Main.styles';
import Teams from '../Teams/Teams';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Team } from '../Teams/Teams.types';
import { SettingsData } from '../Settings/Settings.types';
import StintsByPilots from '../StintsByPilots/StintsByPilots';
import { defaultSettingsData } from '../Settings/Settings.constants';
import { getStintsAnalysis } from '../../utils/getStintsAnalysis';
import { getPenaltiesByStintLimit } from '../../utils/getPenaltiesByStintLimit';
import { getPenaltiesByPilotLimit } from '../../utils/getPenaltiesByPilotLimit';
import AutoPenalties from '../AutoPenalties/AutoPenalties';
import { defaultStintsByPilots, defaultTeams } from './Main.constants';
import { CalculatedData } from '../../types';

interface MainProps {
    onCalculate?: (calculatedData: CalculatedData) => void;
}

const Main = ({ onCalculate }: MainProps) => {
    const [raceData, setRaceData] = useState<RaceData>({});
    const [settingsData, setSettingsData] = useLocalStorage<SettingsData>(
        'settings',
        defaultSettingsData
    );
    const [penaltiesManual, setPenaltiesManual] = useState<PenaltiesData>({});
    const [penaltiesByPilotLimit, setPenaltiesByPilotLimit] = useState<PenaltiesData>({});
    const [penaltiesByStintLimit, setPenaltiesByStintLimit] = useState<PenaltiesData>({});

    const [results, setResults] = useState<ResultsData[]>();
    const [teams, setTeams] = useLocalStorage<Team[]>('teams', defaultTeams);
    const [stintsByPilots, setStintsByPilots] = useLocalStorage<StintsByPilotsData>(
        'stintsByPilots',
        defaultStintsByPilots
    );

    const calculate = () => {
        const teamDataExtended: TeamDataExtended = {};

        const stintsAnalysis = getStintsAnalysis(raceData, stintsByPilots, settingsData);

        const penaltiesByStintLimit: Record<string, number> = getPenaltiesByStintLimit(
            stintsAnalysis,
            Number(settingsData.maxStint) * 60,
            // Number(settingsData.minStintsQuantity)
        );
        const penaltiesByPilotLimit = getPenaltiesByPilotLimit(
            stintsAnalysis,
            Number(settingsData.minForPilotIfTwo) * 60,
            Number(settingsData.minForPilotIfThree) * 60,
            Number(settingsData.minForPilotIfFour)
        );

        setPenaltiesByStintLimit(penaltiesByStintLimit);
        setPenaltiesByPilotLimit(penaltiesByPilotLimit);
        // END OF stints analysis

        for (const teamNumber in raceData) {
            teamDataExtended[teamNumber] = {
                ...raceData[teamNumber],
                totalTime: 0,
                avgTimeTotal: 0,
            };
        }

        for (const teamNumber in raceData) {
            const totalLapsTime = raceData[teamNumber].laps.reduce((acc, cur) => {
                return acc + cur.lapTime;
            }, 0);

            teamDataExtended[teamNumber].totalTime =
                totalLapsTime +
                raceData[teamNumber].startGap +
                (penaltiesManual[teamNumber] || 0) +
                penaltiesByPilotLimit[teamNumber] +
                penaltiesByStintLimit[teamNumber];
            teamDataExtended[teamNumber].avgTimeTotal =
                teamDataExtended[teamNumber].totalTime / raceData[teamNumber].laps.length;
        }

        const orderedTeams = [];
        for (const teamNumber in teamDataExtended) {
            const team = teams.find((team) => team.name === teamNumber);
            orderedTeams.push({
                avgTimeTotal: teamDataExtended[teamNumber].avgTimeTotal,
                teamNumber,
                pilots: [team?.pilotOne, team?.pilotTwo, team?.pilotThree, team?.pilotFour].filter(
                    (v) => v
                ),
                laps: teamDataExtended[teamNumber].laps.length,
                totalTimeWithGapWithoutPenalties:
                    Math.round(
                        (teamDataExtended[teamNumber].totalTime -
                            ((penaltiesManual[teamNumber] || 0) +
                                penaltiesByPilotLimit[teamNumber] +
                                penaltiesByStintLimit[teamNumber])) *
                            1000
                    ) / 1000,
                penalty:
                    (penaltiesManual[teamNumber] || 0) +
                    penaltiesByPilotLimit[teamNumber] +
                    penaltiesByStintLimit[teamNumber],
                stintsQuantity: stintsByPilots[teamNumber]?.length,
            });
        }

        orderedTeams.sort((a, b) => (a.avgTimeTotal < b.avgTimeTotal ? -1 : 1));

        const calculationData: CalculatedData = {
            results: orderedTeams,
            stintsAnalysis,
            penalties: {
                penaltiesManual,
                penaltiesByStintLimit,
                penaltiesByPilotLimit,
            },
            settingsData: {
                maxStint: Number(settingsData.maxStint),
                minForPilotIfFour: Number(settingsData.minForPilotIfFour),
                minForPilotIfThree: Number(settingsData.minForPilotIfThree),
                minForPilotIfTwo: Number(settingsData.minForPilotIfTwo),
                minPitStopLapTime: Number(settingsData.minPitStopLapTime),
                minStintsQuantity: Number(settingsData.minStintsQuantity),
            },
        };

        console.log('%c * ', 'background: #000; color: aqua', calculationData);

        // Pass the calculation data to the parent component if the callback is provided
        if (onCalculate) {
            onCalculate(calculationData);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore //TODO FIXME
        setResults(orderedTeams);
    };

    return (
        <div className='App'>
            <Flex>
                <CSVUploader setTeamData={setRaceData} />

                <Teams teams={teams} setTeams={setTeams} />

                <Settings settingsData={settingsData} setSettingsData={setSettingsData} />

                <ManualPenalties
                    penaltiesManual={penaltiesManual}
                    setPenaltiesManual={setPenaltiesManual}
                />
            </Flex>

            {teams && Boolean(teams.length) && (
                <StintsByPilots
                    teams={teams}
                    stintsQuantity={Number(settingsData.minStintsQuantity)}
                    setStintsByPilots={setStintsByPilots}
                    stintsByPilots={stintsByPilots}
                />
            )}

            <button disabled={Object.keys(raceData).length === 0} onClick={calculate}>
                Calculate
            </button>

            {results && (
                <>
                    <AutoPenalties
                        penaltiesByPilotLimit={penaltiesByPilotLimit}
                        penaltiesByStintLimit={penaltiesByStintLimit}
                    />

                    <Results results={results} />
                </>
            )}
        </div>
    );
};

export default Main;
