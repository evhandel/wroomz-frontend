import styled from '@emotion/styled';
import { theme } from '../../../../theme';
import { SectionWrapper as BaseSectionWrapper } from '../../../../components/common/styles';

export const SectionWrapper = styled(BaseSectionWrapper)`
    margin-top: 24px;
`;

export const Box = styled.div`
    height: 8px;
`;

export const DisplayCell = styled('div', {
    shouldForwardProp: (prop) => prop !== 'hasError' && prop !== 'isEmpty',
})<{ hasError?: boolean; isEmpty?: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 150px;
    min-height: 38px;
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid
        ${({ hasError }) =>
            hasError ? theme.palette.error.main : 'rgba(255, 255, 255, 0.12)'};
    color: ${({ hasError, isEmpty }) =>
        hasError
            ? theme.palette.error.main
            : isEmpty
            ? theme.palette.text.secondary
            : theme.palette.text.primary};
    font-size: 14px;
    line-height: 1.2;
    cursor: pointer;
    user-select: none;
    transition: border-color 0.12s ease, background-color 0.12s ease;

    &:hover,
    &:focus-visible {
        border-color: ${theme.palette.primary.main};
        background-color: rgba(255, 255, 255, 0.04);
        outline: none;
    }
`;

export const KartTag = styled.span`
    font-size: 12px;
    opacity: 0.7;
`;

export const DisplayDelButton = styled.button`
    margin-left: auto;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: ${theme.palette.text.secondary};
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    opacity: 0.55;
    transition: opacity 0.12s ease, color 0.12s ease, background-color 0.12s ease;

    &:hover,
    &:focus-visible {
        opacity: 1;
        color: ${theme.palette.error.main};
        background-color: rgba(255, 255, 255, 0.06);
        outline: none;
    }
`;
