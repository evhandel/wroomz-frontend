import React, { FC } from 'react';
import { Green, Red } from './AutoPenalties.styles';
import { SectionWrapper, Label, SectionHeader } from '../common/styles';
import { PenaltiesProps } from './AutoPenalties.types';

const AutoPenalties: FC<PenaltiesProps> = (props) => {
    const { penaltiesByPilotLimit, penaltiesByStintLimit } = props;

    const sortedPenaltiesByPilotLimit = Object.entries(penaltiesByPilotLimit).sort((a, b) =>
        a[0] < b[0] ? -1 : 1
    );
    const sortedPenaltiesByStintLimit = Object.entries(penaltiesByStintLimit).sort((a, b) =>
        a[0] < b[0] ? -1 : 1
    );

    const hasPenaltiesByPilotLimit = sortedPenaltiesByPilotLimit.some(
        (penalties) => Number(penalties[1]) > 0
    );
    const hasPenaltiesByStintLimit = sortedPenaltiesByStintLimit.some(
        (penalties) => (penalties[1] as number) > 0
    );

    return (
        <SectionWrapper>
            <SectionHeader>Penalties</SectionHeader>
            <Label>By stints limit</Label>
            {!hasPenaltiesByStintLimit && <Label>No penalties</Label>}

            <Label>
                {sortedPenaltiesByStintLimit.map((penalty) =>
                    (penalty[1] as number) === 0 ? null : (penalty[1] as number) < 0 ? (
                        <Green
                            key={penalty[0]}
                        >{`Team ${penalty[0]} has ${penalty[1]} sec (compensation)`}</Green>
                    ) : (
                        <Red
                            key={penalty[0]}
                        >{`Team ${penalty[0]} has +${penalty[1]} sec (penalty)`}</Red>
                    )
                )}
            </Label>
            <br />
            <Label>By limit on pilot </Label>
            {!hasPenaltiesByPilotLimit && <Label>No penalties</Label>}

            <Label>
                {sortedPenaltiesByPilotLimit.map((penalty) =>
                    (penalty[1] as number) === 0 ? null : (penalty[1] as number) < 0 ? (
                        <Green
                            key={penalty[0]}
                        >{`Team ${penalty[0]} has ${penalty[1]} sec (compensation)`}</Green>
                    ) : (
                        <Red
                            key={penalty[0]}
                        >{`Team ${penalty[0]} has +${penalty[1]} sec (penalty)`}</Red>
                    )
                )}
            </Label>
        </SectionWrapper>
    );
};

export default AutoPenalties;
