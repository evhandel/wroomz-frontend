import { Chart } from 'chart.js';

export const getOrCreateTooltip = (chart: Chart) => {
    let tooltipEl = chart.canvas.parentNode?.querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.fontSize = '12px';
        tooltipEl.style.textAlign = 'left';
        tooltipEl.style.color = 'white';
        tooltipEl.style.width = '300px';
        tooltipEl.style.opacity = '1';
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .2s ease';

        const table = document.createElement('table');
        table.style.margin = '0px';

        tooltipEl.appendChild(table);
        chart.canvas.parentNode?.appendChild(tooltipEl);
    }

    return tooltipEl;
};
