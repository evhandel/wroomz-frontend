import styled, { css } from 'styled-components';

export const Root = styled.div`
    border-radius: 8px;
    padding: 4px 8px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s;

    &:hover {
        filter: brightness(150%);
    }
`;
export const Label = styled.span<{ active?: boolean }>`
    ${(props) =>
        !props.active &&
        css`
            color: rgb(161, 161, 170);
        `}
    font-size: 0.9em;
    margin-right: 4px;
    width: 40px;
    display: inline-block;
`;

export const StyledSpan = styled.span<{ fastest: boolean }>`
    ${(props) =>
        props.fastest
            ? css`
                  color: #a200fa;
                  font-weight: bold;
              `
            : ''}
`;
