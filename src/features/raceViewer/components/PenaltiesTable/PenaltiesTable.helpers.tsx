import { formatTime } from '../../helpers/format';
import { Green, Red } from '../common/styles';

export const printPenaltyValue = (penalty: number) => {
    if (penalty > 0) {
        return (
            <Red>
                <b>{formatTime(penalty, true, true)}</b>
            </Red>
        );
    }
    if (penalty < 0) {
        return (
            <Green>
                <b>{formatTime(penalty, true, true)}</b>
            </Green>
        );
    }

    return <div>{formatTime(penalty, true, true)}</div>;
};
