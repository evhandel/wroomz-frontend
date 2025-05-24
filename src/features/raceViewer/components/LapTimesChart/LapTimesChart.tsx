import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    InteractionModeMap,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Root } from './LapTimesChart.styles';
import { useLapTimesChartData } from './LapTimesChart.data';
import { externalTooltipHandler } from './LapTimesChart.tooltip';
import { minLapTime } from '../../data/minLapTime';
import { useParams } from 'react-router-dom';
import { useRaceData } from '../../data/useRaceData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    scales: {
        x: {
            grid: {
                color: 'rgb(28, 25, 23)',
            },
        },
        y: {
            max: minLapTime + 3.4,
            min: minLapTime - 0.1,
            grid: {
                color: 'rgb(28, 25, 23)',
            },
        },
    },
    interaction: {
        intersect: false,
        mode: 'index' as keyof InteractionModeMap,
    },
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Lap Times',
        },
        tooltip: {
            enabled: false,
            // position: 'nearest' as const,
            external: externalTooltipHandler,
        },
    },
} as const;

interface Dataset {
    data: number[];
    label: string;
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    pointRadius: number;
    pointHoverRadius: number;
}

const LapTimesChart = () => {
    const { id = '' } = useParams<{ id: string }>();
    const { data: raceData } = useRaceData(id);
    const chartData = useLapTimesChartData(id);

    if (!raceData) {
        return <div>Loading chart data...</div>;
    }

    return (
        <Root>
            <Line options={options} data={chartData as ChartData<'line', number[]>} />
        </Root>
    );
};

export default LapTimesChart;
