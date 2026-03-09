import React, { memo } from 'react';
import { LapTimeCell } from './LapCell.styles';
import { LapCellProps } from './LapCell.types';
import { getLapHighlight } from './LapCell.utils';
import { formatTime } from '../../../../helpers/format';

export const LapCell: React.FC<LapCellProps> = memo(
    ({ lap, lapIndex, teamIndex, lapTimesArray, currentRowLaps }) => {
        if (!lap || isNaN(lap.time)) {
            return (
                <LapTimeCell align='center' $highlight='none'>
                    -
                </LapTimeCell>
            );
        }

        const highlight = getLapHighlight({
            lap,
            lapIndex,
            teamIndex,
            lapTimesArray,
            currentRowLaps,
        });

        return (
            <LapTimeCell align='center' $highlight={highlight}>
                {formatTime(lap.time, true)}
            </LapTimeCell>
        );
    }
);

LapCell.displayName = 'LapCell';
