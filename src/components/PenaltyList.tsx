import { FC } from 'react';
import PenaltyText from './PenaltyText';
import { PenaltiesData } from '../types/race';

interface PenaltyListProps {
    penalties: PenaltiesData;
    skipZeroes?: boolean;
}

const PenaltyList: FC<PenaltyListProps> = ({ penalties, skipZeroes }) => {
    const sorted = Object.entries(penalties).sort((a, b) => Number(a[0]) - Number(b[0]));

    return (
        <>
            {sorted.map(([team, value]) => {
                if (skipZeroes && value === 0) return null;
                const prefix = value > 0 ? '+' : '';
                const postfix = value >= 0 ? 'penalty' : 'compensation';
                return (
                    <div key={team}>
                        <PenaltyText value={value}>
                            {`Team ${team} has ${prefix}${value} sec (${postfix})`}
                        </PenaltyText>
                    </div>
                );
            })}
        </>
    );
};

export default PenaltyList;
