import { log } from 'console';
import { lapByLap } from '../../data/lapByLap';
import { getOrCreateTooltip } from '../../helpers/chartsTooltip';
import { Chart } from 'chart.js';

export const externalTooltipHandler = (context: { chart: Chart; tooltip: any }) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = '0';
        return;
    }

    console.log('%c * externalTooltipHandler', 'background: #000; color: aqua', tooltip);

    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];

        const tableHead = document.createElement('thead');

        titleLines.forEach((title: string) => {
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
        tooltip.dataPoints.forEach((dataPoint: any, i: number) => {
            const colors = tooltip.labelColors[i];

            const span = document.createElement('span');
            span.style.background = colors.backgroundColor;
            span.style.borderColor = colors.borderColor;
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
            const parsedLabelArray = dataPoint.dataset.label.split(' — ');
            const team = parsedLabelArray ? parsedLabelArray[0] : null;

            const lapData = lapByLap[team] && lapByLap[lapIndex][team];

            // Get averageLapTimeForWinner from chart object
            const averageLapTimeForWinner = (chart as any).averageLapTimeForWinner || 0;

            const delta = lapData.elapsedTime - averageLapTimeForWinner * (lapIndex + 1);
            const deltaText = delta > 0 ? `+${delta.toFixed(3)}` : delta.toFixed(3);

            const text = lapData
                ? document.createTextNode(
                      `${team} —  ${lapData.pilot}: ${deltaText} (kart ${lapData.kart}, stint ${lapData.stint})`
                  )
                : document.createTextNode('');

            td.appendChild(span);
            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');

        if (tableRoot) {
            // Remove old children
            while (tableRoot.firstChild) {
                tableRoot.firstChild.remove();
            }

            // Add new children
            tableRoot.appendChild(tableHead);
            tableRoot.appendChild(tableBody);
        }
    }

    const { offsetLeft: positionX } = chart.canvas;

    console.log('%c * ', 'background: #000; color: aqua', {
        positionX,
        caretY: tooltip.caretY,
        chart: chart,
        tooltip: tooltip,
    });

    const styleLeft =
        tooltip.caretX < chart.width / 2 ? tooltip.caretX + 150 + 15 : tooltip.caretX - 150 - 15;
    const styleTop = tooltip._eventPosition.y - tooltip.height / 2;

    tooltipEl.style.opacity = '1';
    tooltipEl.style.left = styleLeft + 'px';
    tooltipEl.style.top = styleTop + 'px';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.background = 'rgba(55, 55, 55, 0.80)';

    // Add safety check for bodyFont
    if (
        tooltip.options.bodyFont &&
        typeof tooltip.options.bodyFont === 'object' &&
        tooltip.options.bodyFont.string
    ) {
        tooltipEl.style.font = tooltip.options.bodyFont.string;
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
