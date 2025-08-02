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
import { Root } from './DeltaTimesChart.styles';
import { useDeltaTimesChartData } from './DeltaTimesChart.data';
import { externalTooltipHandler, setLapByLapData } from './DeltaTimesChart.tooltip';
import { useParams } from 'react-router-dom';
import { useRaceData } from '../../data/useRaceData';
import { useLapByLap } from '../../data/lapByLap';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// interface Dataset {
//     data: number[];
//     label: string;
//     borderColor: string;
//     backgroundColor: string;
//     borderWidth: number;
//     pointRadius: number;
//     pointHoverRadius: number;
//     cubicInterpolationMode: 'monotone';
// }

const DeltaTimesChart = () => {
    const { id = '' } = useParams<{ id: string }>();
    const { data: raceData } = useRaceData(id);
    const chartData = useDeltaTimesChartData(id);
    const lapByLapData = useLapByLap(id);

    // Set the lap by lap data for the tooltip
    useEffect(() => {
        if (lapByLapData && lapByLapData.length > 0) {
            setLapByLapData(lapByLapData);
        }
    }, [lapByLapData]);

    console.log('%c * chartData', 'background: #000; color: aqua', chartData);

    const options = useMemo(
        () => ({
            responsive: true,
            scales: {
                y: {
                    grid: {
                        color: 'rgb(28, 25, 23)',
                    },
                },
                x: {
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
                tooltip: {
                    enabled: false,
                    external: (context: any) => {
                        // Pass averageLapTimeForWinner to the tooltip handler
                        context.chart.averageLapTimeForWinner = chartData.averageLapTimeForWinner;
                        return externalTooltipHandler(context);
                    },
                },
            },
        }),
        [chartData.averageLapTimeForWinner]
    );

    if (!raceData) {
        return <div>Loading chart data...</div>;
    }

    return (
        <Root>
            <h3 style={{ paddingLeft: '60px' }}>Delta Time Chart (Legend is clickable)</h3>

            <Line options={options} data={chartData as ChartData<'line', number[]>} />
        </Root>
    );
};

export default DeltaTimesChart;
