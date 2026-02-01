import styled, { css } from 'styled-components';
import { StyledTableCell } from '../../LapsTable.styles';
import { LapHighlight } from './LapCell.types';

const highlightStyles: Record<LapHighlight, ReturnType<typeof css>> = {
    firstLapOfStint: css`
        color: #fff;
        font-weight: bold;
        background-color: #666;
    `,
    overallBest: css`
        color: #ba55d3;
        font-weight: bold;
    `,
    personalBest: css`
        color: #32cd32;
        font-weight: bold;
    `,
    none: css``,
};

export const LapTimeCell = styled(StyledTableCell)<{ $highlight: LapHighlight }>`
    ${({ $highlight }) => highlightStyles[$highlight]}
`;
