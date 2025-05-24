import { lapByLap } from './lapByLap';

const lastLap = lapByLap[lapByLap.length - 1];

export const teamFirstFinish = {
    no: '',
    elapsedTime: 999999999,
};
console.log('%c * hhhh', 'background: #000; color: aqua');
for (let team in lastLap) {
    if (lastLap[team].elapsedTime < teamFirstFinish.elapsedTime) {
        teamFirstFinish.no = team;
        teamFirstFinish.elapsedTime = lastLap[team].elapsedTime;
    }
}
