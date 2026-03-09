import { Chart, TooltipModel } from 'chart.js';
import { getOrCreateTooltip } from './chartsTooltip';
import { LapByLapItem } from '../data/lapByLap';

interface LapEntry {
    lapTime: number;
    elapsedTime: number;
    pilot: string;
    stint: number;
    kart: string;
}

interface ExternalTooltipHandlerConfig {
    lapByLapRef: { current: LapByLapItem[] };
    formatValue: (lapData: LapEntry, lapIndex: number, chart: Chart) => string;
    background?: string;
}

export const createExternalTooltipHandler = (config: ExternalTooltipHandlerConfig) => {
    return (context: { chart: Chart; tooltip: TooltipModel<'line'> }) => {
        const { chart, tooltip } = context;
        const tooltipEl = getOrCreateTooltip(chart);

        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = '0';
            return;
        }

        if (tooltip.body) {
            const titleLines = tooltip.title || [];

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

            const lapByLapData = config.lapByLapRef.current;

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

                const lapData =
                    team && lapByLapData[lapIndex] ? lapByLapData[lapIndex][team] : null;

                if (!lapData) return;

                const valueText = config.formatValue(lapData, lapIndex, chart);

                const text = document.createTextNode(
                    `${team} —  ${lapData.pilot}: ${valueText} (kart ${lapData.kart}, stint ${lapData.stint})`
                );

                td.appendChild(span);
                td.appendChild(text);
                tr.appendChild(td);
                tableBody.appendChild(tr);
            });

            const tableRoot = tooltipEl.querySelector('table');

            if (tableRoot) {
                while (tableRoot.firstChild) {
                    tableRoot.firstChild.remove();
                }

                tableRoot.appendChild(tableHead);
                tableRoot.appendChild(tableBody);
            }
        }

        const TOOLTIP_OFFSET = 150;
        const TOOLTIP_GAP = 15;
        const styleLeft =
            tooltip.caretX < chart.width / 2
                ? tooltip.caretX + TOOLTIP_OFFSET + TOOLTIP_GAP
                : tooltip.caretX - TOOLTIP_OFFSET - TOOLTIP_GAP;
        const styleTop = tooltip.caretY - tooltip.height / 2;

        tooltipEl.style.opacity = '1';
        tooltipEl.style.left = styleLeft + 'px';
        tooltipEl.style.top = styleTop + 'px';
        tooltipEl.style.position = 'absolute';

        if (config.background) {
            tooltipEl.style.background = config.background;
        }

        if (
            tooltip.options.bodyFont &&
            typeof tooltip.options.bodyFont === 'object' &&
            'string' in tooltip.options.bodyFont
        ) {
            tooltipEl.style.font = (tooltip.options.bodyFont as { string: string }).string;
        } else if (
            tooltip.options.bodyFont &&
            typeof tooltip.options.bodyFont.toString === 'function'
        ) {
            tooltipEl.style.font = tooltip.options.bodyFont.toString();
        } else {
            tooltipEl.style.font = '12px Arial';
        }

        tooltipEl.style.padding =
            tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';

        if (tooltip.caretX < chart.width / 2) {
            tooltipEl.classList.add('corner-style-left');
            tooltipEl.classList.remove('corner-style-right');
        } else {
            tooltipEl.classList.add('corner-style-right');
            tooltipEl.classList.remove('corner-style-left');
        }
    };
};
