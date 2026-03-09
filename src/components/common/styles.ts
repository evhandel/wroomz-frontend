import styled from '@emotion/styled';
import { theme } from '../../theme';

export const SectionWrapper = styled.div`
    padding: 24px;
    background-color: ${theme.custom.sectionBackground};
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    margin: 0;
    min-width: 300px;
`;

export const SectionHeader = styled.div`
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    opacity: 0.45;
    margin-bottom: 16px;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
`;

export const Red = styled.span`
    color: ${theme.palette.error.main};
`;

export const Green = styled.span`
    color: ${theme.palette.success.main};
`;

export const Flex = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;
