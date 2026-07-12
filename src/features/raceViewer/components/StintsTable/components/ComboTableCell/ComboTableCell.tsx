import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { formatTime } from '../../../../helpers/format';
import { Label, Root, StyledSpan } from './ComboTableCell.styles';
import { getColorForLapTime, BG_PALETTE, ACCENT_PALETTE } from '../../../../helpers/colors';
import { ComboTableCellProps } from './ComboTableCell.types';
import { Red } from '../../../../../../components/common/styles';
import { theme } from '../../../../../../theme';

const MERGED_MARKER_GLYPH = {
    top: '┌',
    middle: '│',
    bottom: '└',
} as const;

const ComboTableCell: React.FC<ComboTableCellProps> = React.memo((props) => {
    const { activeKart, setActiveKart, fastestAvg, fastestBest, fastestPit, kartHasFixedNumber } =
        props;

    const alphaChanel = !kartHasFixedNumber
        ? 1
        : activeKart === null || activeKart === props.kart
          ? 1
          : 0.3;

    const handleClick = () => {
        if (!kartHasFixedNumber) return;
        if (activeKart === props.kart) {
            setActiveKart(null);
        } else {
            setActiveKart(props.kart || null);
        }
    };

    return (
        <Root
            style={{
                background: getColorForLapTime(
                    props.bestLap,
                    props.minLapTime,
                    BG_PALETTE,
                    alphaChanel
                ),
                color: '#FFF',
                border: `1px solid ${getColorForLapTime(props.bestLap, props.minLapTime, ACCENT_PALETTE, 0.1)}`,
            }}
            onClick={kartHasFixedNumber ? handleClick : undefined}
        >
            <div
                style={{
                    fontWeight: '700',
                }}
            >
                {props.pilot}
            </div>
            {kartHasFixedNumber && (
                <div>
                    <Label>Kart</Label>
                    {activeKart === props.kart && <b>{props.kart}</b>}
                    {activeKart !== props.kart && <span>{props.kart}</span>}
                </div>
            )}
            <div>
                <Label $active={fastestBest}>Best:</Label>
                <StyledSpan $fastest={fastestBest}>{formatTime(props.bestLap)}</StyledSpan>
            </div>
            <div>
                <Label $active={Number.isFinite(props.avgLapExcludingPitExitLap) && fastestAvg}>
                    Avg:
                </Label>
                {Number.isFinite(props.avgLapExcludingPitExitLap) ? (
                    <StyledSpan
                        $fastest={fastestAvg}
                        style={{
                            color: !fastestAvg
                                ? getColorForLapTime(
                                      props.bestLap,
                                      props.minLapTime,
                                      ACCENT_PALETTE,
                                      1
                                  )
                                : undefined,
                        }}
                    >
                        {formatTime(props.avgLapExcludingPitExitLap)}
                    </StyledSpan>
                ) : (
                    <span>-:-</span>
                )}
            </div>
            {props.laps[0].no > 1 && (
                <div>
                    <Label $active={fastestPit}>Pit:</Label>
                    {props.laps[0].time < props.minPitStopLapTime ? (
                        <Red>
                            <b>{formatTime(props.laps[0].time)}</b>
                        </Red>
                    ) : (
                        <StyledSpan $fastest={fastestPit}>
                            {formatTime(props.laps[0].time)}
                        </StyledSpan>
                    )}
                </div>
            )}
            <div>
                {props.mergedMarker && (
                    <Tooltip
                        title={`Combined consecutive stints exceed max (${formatTime(
                            props.stintMaxLimit * 60
                        )})`}
                        arrow
                    >
                        <span
                            style={{
                                fontFamily: 'monospace',
                                color: theme.palette.error.main,
                                marginRight: '2px',
                            }}
                        >
                            {MERGED_MARKER_GLYPH[props.mergedMarker]}
                        </span>
                    </Tooltip>
                )}
                <Label
                    $active={
                        props.stintMaxLimit > 0 && props.duration > props.stintMaxLimit * 60
                    }
                >
                    Dur:
                </Label>
                {props.stintMaxLimit > 0 && props.duration > props.stintMaxLimit * 60 ? (
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
