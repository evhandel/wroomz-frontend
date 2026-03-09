import styled from '@emotion/styled';
import { theme } from '../../../../theme';

export const ResultsWrapper = styled.div`
    margin: 20px auto;
    width: fit-content;
    align-self: center;
    padding: 20px;
    background-color: ${theme.custom.sectionBackground};
    border-radius: 12px;
    border-color: rgb(39, 39, 42);
    border-style: solid;
    border-width: 1px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ResultItem = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
`;

export const Position = styled.span`
    color: #fff;
`;

export const TeamNumber = styled.span`
    font-weight: bold;
    color: rgb(161, 161, 170);
`;

export const DriverNames = styled.span`
    font-style: italic;
`;

export const Time = styled.span`
    color: rgb(161, 161, 170);
`;
