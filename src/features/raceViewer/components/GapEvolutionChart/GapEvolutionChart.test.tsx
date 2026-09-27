import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import type { Chart, ChartData, TooltipModel } from 'chart.js';
import type { StintAnalysis } from '@evhandel/wroomz-types';
import { theme } from '../../../../theme';
import { useRaceData } from '../../data/useRaceData';
import GapEvolutionChart from './GapEvolutionChart';
import LapTimesChart from '../LapTimesChart/LapTimesChart';

jest.mock('../../data/useRaceData', () => ({ useRaceData: jest.fn() }));
jest.mock('react-chartjs-2', () => ({ Line: jest.fn() }));

const mockUseRaceData = useRaceData as jest.MockedFunction<typeof useRaceData>;
const mockLine = Line as jest.MockedFunction<typeof Line>;

const makeStint = (
    pilot: string,
    kart: string,
    no: number,
    laps: StintAnalysis['laps'],
    startGap = 0
): StintAnalysis => ({
    pilot,
    kart,
    no,
    laps,
    startGap,
    startTime: 0,
    endTime: laps[laps.length - 1].elapsedTime,
    duration: laps.reduce((sum, lap) => sum + lap.time, startGap),
    avgLapExcludingPitExitLap: 50,
    bestLap: Math.min(...laps.map((lap) => lap.time)),
});

const renderChart = (component = <GapEvolutionChart />) => {
    render(
        <ThemeProvider theme={theme}>
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                {component}
            </MemoryRouter>
        </ThemeProvider>
    );
    const props = mockLine.mock.calls[mockLine.mock.calls.length - 1][0];
    const data = props.data as ChartData<'line', number[], number>;
    const externalTooltip = props.options?.plugins?.tooltip?.external;

    if (!externalTooltip) {
        throw new Error('Expected an external chart tooltip handler');
    }

    const showTooltip = (dataIndex: number) => {
        const chart = { canvas: screen.getByTestId('race-chart'), width: 600 } as Chart;
        const tooltip = {
            opacity: 1,
            title: [String(data.labels?.[dataIndex])],
            body: [{}],
            dataPoints: data.datasets
                .filter((dataset) => dataset.data[dataIndex] !== undefined)
                .map((dataset) => ({ dataset, dataIndex })),
            labelColors: data.datasets.map(() => ({
                backgroundColor: 'red',
                borderColor: 'red',
            })),
            caretX: 100,
            caretY: 100,
            height: 50,
            options: { padding: 0 },
        } as TooltipModel<'line'>;
        externalTooltip.call(tooltip, { chart, tooltip });
        return screen.getByRole('table');
    };

    return { data, showTooltip };
};

beforeEach(() => {
    jest.clearAllMocks();
    mockLine.mockImplementation(() => <canvas data-testid='race-chart' />);
    mockUseRaceData.mockReturnValue({
        data: {
            results: [
                { teamNumber: '1', laps: 3, totalTimeWithGapWithoutPenalties: 150 },
                { teamNumber: '2', laps: 2, totalTimeWithGapWithoutPenalties: 120 },
            ],
            stintsAnalysis: {
                '1': [
                    makeStint(
                        'Alice',
                        '7',
                        1,
                        [
                            { no: 1, time: 38.753, elapsedTime: 40 },
                            { no: 2, time: 50, elapsedTime: 90 },
                        ],
                        1.247
                    ),
                    makeStint('Bea', '8', 2, [{ no: 3, time: 60, elapsedTime: 150 }]),
                ],
                '2': [
                    makeStint('Carla', '9', 1, [
                        { no: 1, time: 60, elapsedTime: 60 },
                        { no: 2, time: 60, elapsedTime: 120 },
                    ]),
                ],
            },
        },
    } as unknown as ReturnType<typeof useRaceData>);
});

it('starts each line at its starting gap without changing real-lap values', () => {
    const { data } = renderChart();

    expect(data.labels).toEqual([0, 1, 2, 3]);
    expect(data.datasets.map((dataset) => dataset.data)).toEqual([
        [1.247, -10, -10, 0],
        [0, 10, 20],
    ]);
});

it('shows starting gaps in crossing order and the correct drivers and gaps on real laps', () => {
    const { showTooltip } = renderChart();

    const start = showTooltip(0);
    expect(start).toHaveTextContent('Lap #0');
    expect(start).toHaveTextContent('1 — 1.247');
    expect(start).toHaveTextContent('2 — 0.000');
    expect(Array.from(start.querySelectorAll('tbody tr'), (row) => row.textContent)).toEqual([
        '2 — 0.000',
        '1 — 1.247',
    ]);
    expect(start).not.toHaveTextContent('kart');

    const firstLap = showTooltip(1);
    expect(firstLap).toHaveTextContent('Lap #1');
    expect(firstLap).toHaveTextContent('Alice: P1 (kart 7, stint 1)');
    expect(firstLap).toHaveTextContent('Carla: +20.000 (kart 9)');

    const lastLap = showTooltip(3);
    expect(lastLap).toHaveTextContent('Lap #3');
    expect(lastLap).toHaveTextContent('Bea: P1 (kart 8, stint 2)');
    expect(lastLap).not.toHaveTextContent('Carla');
});

it('falls back to zero when the starting gap is missing', () => {
    const { data: raceData } = mockUseRaceData('test-race');
    delete (raceData!.stintsAnalysis['1'][0] as Partial<StintAnalysis>).startGap;

    const { data, showTooltip } = renderChart();

    expect(data.datasets[0].data).toEqual([0, -10, -10, 0]);
    expect(showTooltip(0)).toHaveTextContent('1 — 0.000');
});

it('keeps the lap-time chart and its tooltip starting at lap one', () => {
    const { data, showTooltip } = renderChart(<LapTimesChart />);

    expect(data.labels).toEqual([1, 2, 3]);
    expect(data.datasets[0].data).toEqual([38.753, 50, 60]);
    const firstLap = showTooltip(0);
    expect(firstLap).toHaveTextContent('Alice: 38.753 (kart 7, stint 1)');
    expect(firstLap).toHaveTextContent('Carla: 60.000 (kart 9)');
});
