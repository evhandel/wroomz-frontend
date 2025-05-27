import { Chart, TooltipModel } from 'chart.js';
import { getOrCreateTooltip } from '../../helpers/chartsTooltip';

interface LapData {
    lapTime: number;
    elapsedTime: number;
    pilot: string;
    stint: number;
    kart: string;
}

type LapByLapItem = Record<string, LapData>;

// TODO maybe avoid it
// Store lapByLap data globally
let lapByLapData: any[] = [];

// Set the lap by lap data
export const setLapByLapData = (data: any[]) => {
    lapByLapData = data;
};

export const externalTooltipHandler = (context: {
    chart: Chart;
    tooltip: TooltipModel<'line'>;
}) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = '0';
        return;
    }

    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b: { lines: string[] }) => b.lines);

        const tableHead = document.createElement('thead');

        titleLines.forEach((title) => {
            const tr = document.createElement('tr');
            tr.style.borderWidth = '0';

            const th = document.createElement('th');
            th.style.borderWidth = '0';
            const text = document.createTextNode(`Lap #${title}`);

            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
        });

        const tableBody = document.createElement('tbody');

        // bodyLines.forEach((body, i) => {
        tooltip.dataPoints.forEach((dataPoint, i) => {
            const colors = tooltip.labelColors[i];

            const span = document.createElement('span');
            span.style.background = colors.backgroundColor.toString();
            span.style.borderColor = colors.borderColor.toString();
            span.style.borderWidth = '2px';
            span.style.marginRight = '10px';
            span.style.height = '10px';
            span.style.width = '10px';
            span.style.display = 'inline-block';

            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.borderWidth = '0';

            const td = document.createElement('td');
            td.style.borderWidth = '0';

            const lapIndex = dataPoint.dataIndex;
            const label = dataPoint.dataset.label || '';
            const parsedLabelArray = label.split(' — ');
            const team = parsedLabelArray[0] || '';

            const lapData = team && lapByLapData[lapIndex] ? lapByLapData[lapIndex][team] : null;

            const text = lapData
                ? document.createTextNode(
                      `${team} —  ${lapData.pilot}: ${lapData.lapTime.toFixed(3)} (kart ${lapData.kart}, stint ${lapData.stint})`
                  )
                : document.createTextNode('');

            td.appendChild(span);
            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');

        // Remove old children
        while (tableRoot?.firstChild) {
            tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot?.appendChild(tableHead);
        tableRoot?.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    console.log('%c * ', 'background: #000; color: aqua', {
        positionX,
        caretY: tooltip.caretY,
        chart: chart,
        tooltip: tooltip,
    });

    const styleLeft =
        tooltip.caretX < chart.width / 2 ? tooltip.caretX + 150 + 15 : tooltip.caretX - 150 - 15;
    const styleTop = tooltip.y - tooltip.height / 2;

    tooltipEl.style.opacity = '1';
    tooltipEl.style.left = styleLeft + 'px';
    tooltipEl.style.top = styleTop + 'px';
    tooltipEl.style.position = 'absolute';

    // Add safety check for bodyFont
    if (
        tooltip.options.bodyFont &&
        typeof tooltip.options.bodyFont === 'object' &&
        'string' in tooltip.options.bodyFont
    ) {
        tooltipEl.style.font = (tooltip.options.bodyFont as any).string;
    } else if (
        tooltip.options.bodyFont &&
        typeof tooltip.options.bodyFont.toString === 'function'
    ) {
        tooltipEl.style.font = tooltip.options.bodyFont.toString();
    } else {
        tooltipEl.style.font = '12px Arial';
    }

    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';

    if (tooltip.caretX < chart.width / 2) {
        tooltipEl.classList.add('corner-style-left');
        tooltipEl.classList.remove('corner-style-right');
    } else {
        tooltipEl.classList.add('corner-style-right');
        tooltipEl.classList.remove('corner-style-left');
    }
};
