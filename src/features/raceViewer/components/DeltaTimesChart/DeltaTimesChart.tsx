import { useRef, useMemo } from 'react';
import { InteractionModeMap } from 'chart.js';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useDeltaTimesChartData } from './DeltaTimesChart.data';
import { createExternalTooltipHandler } from '../../helpers/createChartTooltip';
import ChartBase from '../ChartBase/ChartBase';

const DeltaTimesChart = () => {
    const { id = '' } = useParams<{ id: string }>();
    const theme = useTheme();
    const chartData = useDeltaTimesChartData(id);

    const lapByLapRef = useRef<any[]>([]);

    const externalTooltipHandler = useMemo(
        () =>
            createExternalTooltipHandler({
                lapByLapRef,
                formatValue: (lapData, lapIndex) => {
                    const delta =
                        lapData.elapsedTime -
                        chartData.averageLapTimeForWinner * (lapIndex + 1);
                    return delta > 0 ? `+${delta.toFixed(3)}` : delta.toFixed(3);
                },
                background: 'rgba(55, 55, 55, 0.80)',
            }),
        [chartData.averageLapTimeForWinner]
    );

    const options = useMemo(
        () => ({
            responsive: true,
            scales: {
                y: {
                    grid: {
                        color: theme.custom.chartGridColor,
                    },
                },
                x: {
                    grid: {
                        color: theme.custom.chartGridColor,
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
                    external: externalTooltipHandler,
                },
            },
        }),
        [externalTooltipHandler, theme.custom.chartGridColor]
    );

    return (
        <ChartBase
            id={id}
            chartData={chartData}
            options={options}
            lapByLapRef={lapByLapRef}
            title="Delta Time Chart (Legend is clickable)"
        />
    );
};

export default DeltaTimesChart;
