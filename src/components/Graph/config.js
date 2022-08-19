import { Chart } from 'chart.js';

Chart.defaults.font.family = 'Poppins';

export const lineGraphOptions = {
  responsive: true,
  legend: { display: false },
  plugins: {
    legend: { position: 'bottom' },
    title: { display: false, text: 'Data' },
  },
};

export const doughnutGraph = {
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    plugins: {
      legend: { position: 'bottom' },
      title: { display: false, text: 'Data' },
    },
    cutout: 100,
  },
  data: {
    labels: ['Progress Completed', 'Progress Left'],
    datasets: [
      {
        label: '# of Votes',
        data: [60, 40],
        color: '#005CE6',
        backgroundColor: ['#005CE6', '#DEE3F5'],
        borderColor: ['#005CE6', '#DEE3F5'],
        borderWidth: 1,
      },
    ],
  },
  plugins: [
    {
      beforeDraw(chart) {
        const { width } = chart;
        const { height } = chart;
        const { ctx } = chart;
        ctx.restore();
        const fontSize = (height / 160).toFixed(2);
        ctx.font = `${fontSize}em Poppins`;
        ctx.textBaseline = 'top';
        const text = '60%';
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2.55;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ],
};
