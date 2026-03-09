import React from 'react';
import { formatTime } from '../../../../helpers/format';
import { Label, Root, StyledSpan } from './ComboTableCell.styles';
import { getColorForLapTime, BG_PALETTE, ACCENT_PALETTE } from '../../../../helpers/colors';
import { ComboTableCellProps } from './ComboTableCell.types';
import { Red } from '../../../../../../components/common/styles';

const ComboTableCell: React.FC<ComboTableCellProps> = React.memo((props) => {
    const { activeKart, setActiveKart, fastestAvg, fastestBest, fastestPit } = props;

    const alphaChanel = activeKart === null || activeKart === props.kart ? 1 : 0.3;

    const handleClick = () => {
        if (activeKart === props.kart) {
            setActiveKart(null);
        } else {
            setActiveKart(props.kart || null);
        }
    };

    return (
        <Root
            style={{
                background: getColorForLapTime(props.bestLap, props.minLapTime, BG_PALETTE, alphaChanel),
                color: '#FFF',
                border: `1px solid ${getColorForLapTime(props.bestLap, props.minLapTime, ACCENT_PALETTE, 0.1)}`,
            }}
            onClick={handleClick}
        >
            <div
                style={{
                    fontWeight: '700',
                }}
            >
                {props.pilot}
            </div>
            <div>
                <Label>Kart</Label>
                {activeKart === props.kart && <b>{props.kart}</b>}
                {activeKart !== props.kart && <span>{props.kart}</span>}
            </div>
            <div>
                <Label $active={fastestBest}>Best:</Label>
                <StyledSpan $fastest={fastestBest}>{props.bestLap.toFixed(3)}</StyledSpan>
            </div>
            <div>
                <Label $active={fastestAvg}>Avg:</Label>
                <StyledSpan
                    $fastest={fastestAvg}
                    style={{
                        color: !fastestAvg ? getColorForLapTime(props.bestLap, props.minLapTime, ACCENT_PALETTE, 1) : undefined,
                    }}
                >
                    {props.avgLapExcludingPitExitLap.toFixed(3)}
                </StyledSpan>
            </div>
            {props.laps[0].no > 1 && (
                <div>
                    <Label $active={fastestPit}>Pit:</Label>
                    {props.laps[0].time < props.minPitStopLapTime ? (
                        <Red>
                            <b>{formatTime(props.laps[0].time)}</b>
                        </Red>
                    ) : (
                        <StyledSpan $fastest={fastestPit}>{formatTime(props.laps[0].time)}</StyledSpan>
                    )}
                </div>
            )}
            <div>
                <Label $active={props.duration > props.stintMaxLimit * 60}>Dur:</Label>
                {props.duration > props.stintMaxLimit * 60 ? (
                    <Red>
                        <b>{formatTime(props.duration)}</b>
                    </Red>
                ) : (
                    <span>{formatTime(props.duration)}</span>
                )}
            </div>

            <div>
                <Label>Laps:</Label>
                {props.laps.length}
            </div>
        </Root>
    );
});

export default ComboTableCell;
