import { useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Root } from './ChartBase.styles';
import { useRaceData } from '../../data/useRaceData';
import { useLapByLap } from '../../data/lapByLap';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartBaseProps {
    id: string;
    chartData: ChartData<'line', number[]>;
    options: object;
    lapByLapRef: { current: any[] };
    title?: string;
}

const ChartBase = ({ id, chartData, options, lapByLapRef, title }: ChartBaseProps) => {
    const { data: raceData } = useRaceData(id);
    const lapByLapData = useLapByLap(id);

    useEffect(() => {
        lapByLapRef.current = lapByLapData;
    }, [lapByLapRef, lapByLapData]);

    if (!raceData) {
        return <div>Loading chart data...</div>;
    }

    return (
        <Root>
            {title && <h3 style={{ paddingLeft: '60px' }}>{title}</h3>}
            <Line options={options} data={chartData} />
        </Root>
    );
};

export default ChartBase;
