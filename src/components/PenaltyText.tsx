import { ReactNode } from 'react';
import { Red, Green } from './common/styles';

interface PenaltyTextProps {
    value: number;
    children: ReactNode;
}

const PenaltyText = ({ value, children }: PenaltyTextProps) => {
    return value > 0 ? <Red>{children}</Red> : <Green>{children}</Green>;
};

export default PenaltyText;
