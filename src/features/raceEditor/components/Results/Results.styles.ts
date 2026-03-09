import styled from '@emotion/styled';
import { theme } from '../../../../theme';

export const ResultsWrapper = styled.div`
    margin-top: 24px;
    padding: 24px;
    background-color: ${theme.custom.sectionBackground};
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
`;

export const ResultItem = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    &:last-child {
        border-bottom: none;
    }
`;

export const Position = styled.span`
    font-weight: bold;
`;

export const TeamNumber = styled.span`
    font-weight: bold;
    color: ${theme.palette.text.secondary};
    margin-right: 10px;
`;

export const DriverNames = styled.span`
    font-style: italic;
    margin-right: 10px;
`;

export const Time = styled.span`
    color: ${theme.palette.text.secondary};
    margin-right: 10px;
`;
