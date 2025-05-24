import styled from 'styled-components';

export const SectionWrapper = styled.div`
    padding: 20px;
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 20px 8px;
    width: 320px;
    min-width: 300px;
    text-align: left;
`;

export const SectionHeader = styled.div`
    text-align: left;
    font-weight: 300;
    padding-bottom: 20px;
    opacity: 0.5;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
`;

export const Input = styled.input`
    width: ${(props) => props.width ?? '40'}px;
    padding: 4px;
    margin: 0 8px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const Red = styled.span`
    color: #e52424;
`;

export const Green = styled.span`
    color: green;
`;
