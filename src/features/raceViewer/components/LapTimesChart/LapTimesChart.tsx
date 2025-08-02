import React, { useMemo, useEffect } from 'react';
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
import { externalTooltipHandler, setLapByLapData } from './LapTimesChart.tooltip';
import { useParams } from 'react-router-dom';
import { useRaceData } from '../../data/useRaceData';
import { useLapByLap } from '../../data/lapByLap';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
    const lapByLapData = useLapByLap(id);

    // Set the lap by lap data for the tooltip
    useEffect(() => {
        if (lapByLapData && lapByLapData.length > 0) {
            setLapByLapData(lapByLapData);
        }
    }, [lapByLapData]);

    // Calculate minimum lap time from backend data
    const minLapTime = useMemo(() => {
        if (!raceData?.stintsAnalysis) return 999;

        let minTime = 999;
        for (const teamNumber in raceData.stintsAnalysis) {
            raceData.stintsAnalysis[teamNumber].forEach((stint) =>
                stint.laps.forEach((lapData) => {
                    if (lapData.time < minTime) {
                        minTime = lapData.time;
                    }
                })
            );
        }
        return minTime;
    }, [raceData]);

    const options = {
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
                external: externalTooltipHandler,
            },
        },
    } as const;

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
