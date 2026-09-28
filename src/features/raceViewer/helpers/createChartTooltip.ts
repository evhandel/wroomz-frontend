import { Chart, TooltipModel } from 'chart.js';
import { getOrCreateTooltip } from './chartsTooltip';
import { LapByLapItem } from '../data/lapByLap';

type LapEntry = LapByLapItem[string];

interface ExternalTooltipHandlerConfig {
    lapByLapRef: { current: LapByLapItem[] };
    formatValue: (
        lapData: LapEntry,
        lapIndex: number,
        chart: Chart,
        leadingVisibleLapData?: LapEntry
    ) => string;
    background?: string;
    includeLapZero?: boolean;
    sortByElapsedTime?: boolean;
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

            const rows = tooltip.dataPoints
                .map((dataPoint, i) => {
                    const lapIndex = dataPoint.dataIndex - (config.includeLapZero ? 1 : 0);
                    const isLapZero = config.includeLapZero && dataPoint.dataIndex === 0;
                    const team = (dataPoint.dataset.label || '').split(' — ')[0];
                    const pointValue = dataPoint.dataset.data[dataPoint.dataIndex];
                    const startGap =
                        isLapZero && typeof pointValue === 'number' ? pointValue : 0;
                    const lapDetails = lapByLapData[isLapZero ? 0 : lapIndex]?.[team];
                    const lapData =
                        isLapZero && lapDetails
                            ? { ...lapDetails, elapsedTime: startGap }
                            : lapDetails;

                    return {
                        colors: tooltip.labelColors[i],
                        lapIndex,
                        isLapZero,
                        team,
                        lapData,
                        startGap,
                    };
                })
                .filter(({ lapData, isLapZero }) => lapData || isLapZero);

            if (config.sortByElapsedTime) {
                rows.sort(
                    (a, b) =>
                        (a.lapData?.elapsedTime ?? a.startGap) -
                        (b.lapData?.elapsedTime ?? b.startGap)
                );
            }

            const leadingVisibleLapData = rows[0]?.lapData;

            rows.forEach(({ colors, lapIndex, team, lapData, startGap }) => {

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

                const valueText = lapData
                    ? config.formatValue(lapData, lapIndex, chart, leadingVisibleLapData)
                    : startGap.toFixed(3);
                const stintText =
                    lapData && lapData.stintCount > 1 ? `, stint ${lapData.stint}` : '';
                const text = document.createTextNode(
                    lapData
                        ? `${team} —  ${lapData.pilot}: ${valueText} (kart ${lapData.kart}${stintText})`
                        : `${team} — ${valueText}`
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
