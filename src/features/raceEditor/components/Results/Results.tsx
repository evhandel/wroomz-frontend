import Tooltip from '@mui/material/Tooltip';
import { ResultItem, ResultsWrapper, Time, Position, TeamNumber, DriverNames } from './Results.styles';
import { Green, Red } from '../common/styles';
import { useRaceEditorStore } from '../../store/RaceEditorStoreProvider';

const Results = () => {
    const results = useRaceEditorStore((s) => s.results);
    if (!results) return null;
    const nonDsqResults = results.filter((r) => !r.isDisqualified);
    const leaderStintQuantity = nonDsqResults.length > 0 ? nonDsqResults[0].stintsQuantity : 0;

    let position = 0;

    return (
        <ResultsWrapper>
            {results.map((result) => {
                const isDsq = result.isDisqualified;
                if (!isDsq) {
                    position++;
                }

                const time = result.avgTimeTotal;

                const penaltyPrefix = result.penalty > 0 ? '+' : '';
                const penaltyPostfix = result.penalty >= 0 ? 'penalty' : 'compensation';
                const penaltyString = `${penaltyPrefix}${Math.round(result.penalty)}s ${penaltyPostfix}`;
                const penaltyElement = result.penalty > 0 ? <Red>{penaltyString}</Red> : <Green>{penaltyString}</Green>;

                return (
                    <ResultItem key={result.teamNumber} style={isDsq ? { opacity: 0.5 } : undefined}>
                        <Position>{isDsq ? 'DSQ' : `P${position}`} — </Position>
                        <TeamNumber>{result.teamNumber}</TeamNumber>
                        <DriverNames>
                            {result.teamLabel ? (
                                <Tooltip title={result.pilots.join(', ')} arrow>
                                    <span>{result.teamLabel}</span>
                                </Tooltip>
                            ) : (
                                result.pilots.join(', ')
                            )}
                        </DriverNames>
                        <Time>(Avg lap time incl. pen. {time})</Time>
                        <Time>{penaltyElement}</Time>
                        <Time>
                            {result.stintsQuantity === leaderStintQuantity ? (
                                ` ${result.stintsQuantity} stints`
                            ) : (
                                <Red>
                                    <b>{result.stintsQuantity} stints</b>
                                </Red>
                            )}
                        </Time>
                    </ResultItem>
                );
            })}
        </ResultsWrapper>
    );
};

export default Results;
