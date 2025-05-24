import React, { FC, useState } from 'react';
import { Green, Red } from '../common/styles';
import { SectionWrapper, Label, Input, SectionHeader } from '../common/styles';
import { PenaltiesProps } from './ManualPenalties.types';

type PenaltyEntry = [string, number];

const ManualPenalties: FC<PenaltiesProps> = (props) => {
    const { penaltiesManual, setPenaltiesManual } = props;

    const [teamNumber, setTeamNumber] = useState('');
    const [value, setValue] = useState('');

    const sortedPenalties = Object.entries(penaltiesManual).sort((a, b) =>
        a[0] < b[0] ? -1 : 1
    ) as PenaltyEntry[];

    const addPenalty = () => {
        const newPenalties = {
            ...penaltiesManual,
            [teamNumber]: (penaltiesManual[teamNumber] || 0) + Number(value),
        };
        setPenaltiesManual(newPenalties);

        setTeamNumber('');
        setValue('');
    };

    return (
        <SectionWrapper>
            <SectionHeader>Manual penalties</SectionHeader>
            <Label>
                {sortedPenalties.map((penalty) =>
                    penalty[1] < 0 ? (
                        <div>
                            <Green
                                key={penalty[0]}
                            >{`Team ${penalty[0]} has ${penalty[1]} sec (compensation)`}</Green>
                        </div>
                    ) : (
                        <div>
                            <Red
                                key={penalty[0]}
                            >{`Team ${penalty[0]} has +${penalty[1]} sec (penalty)`}</Red>
                        </div>
                    )
                )}
            </Label>

            <Label>
                Team number
                <Input
                    type='number'
                    pattern='\d*'
                    value={teamNumber}
                    onChange={(e) => setTeamNumber(e.target.value + '')}
                />
            </Label>

            <Label>
                Penalty/compensation, sec
                <Input
                    type='number'
                    pattern='\d*'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </Label>

            <button disabled={!teamNumber || !value} onClick={addPenalty}>
                Add penalty/compansation
            </button>
        </SectionWrapper>
    );
};

export default ManualPenalties;
