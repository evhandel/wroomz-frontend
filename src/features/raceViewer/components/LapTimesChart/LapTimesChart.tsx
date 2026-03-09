import { useRef, useMemo } from 'react';
import { InteractionModeMap } from 'chart.js';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useRaceData } from '../../data/useRaceData';
import { useLapTimesChartData } from './LapTimesChart.data';
import { createExternalTooltipHandler } from '../../helpers/createChartTooltip';
import ChartBase from '../ChartBase/ChartBase';
import { getMinLapTime } from '../../helpers/getMinLapTime';

const Y_AXIS_MAX_OFFSET = 3.4;
const Y_AXIS_MIN_OFFSET = 0.1;

const LapTimesChart = () => {
    const { id = '' } = useParams<{ id: string }>();
    const theme = useTheme();
    const { data: raceData } = useRaceData(id);
    const chartData = useLapTimesChartData(id);

    const lapByLapRef = useRef<any[]>([]);

    const externalTooltipHandler = useMemo(
        () =>
            createExternalTooltipHandler({
                lapByLapRef,
                formatValue: (lapData) => lapData.lapTime.toFixed(3),
            }),
        []
    );

    const minLapTime = useMemo(() => getMinLapTime(raceData?.stintsAnalysis), [raceData]);

    const options = useMemo(
        () =>
            ({
                responsive: true,
                scales: {
                    x: {
                        grid: {
                            color: theme.custom.chartGridColor,
                        },
                    },
                    y: {
                        max: minLapTime + Y_AXIS_MAX_OFFSET,
                        min: minLapTime - Y_AXIS_MIN_OFFSET,
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
                    title: {
                        display: true,
                        text: 'Lap Times',
                    },
                    tooltip: {
                        enabled: false,
                        external: externalTooltipHandler,
                    },
                },
            }) as const,
        [minLapTime, externalTooltipHandler, theme.custom.chartGridColor]
    );

    return (
        <ChartBase
            id={id}
            chartData={chartData}
            options={options}
            lapByLapRef={lapByLapRef}
        />
    );
};

export default LapTimesChart;
