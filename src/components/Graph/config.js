import { Chart } from 'chart.js';

Chart.defaults.font.family = 'Poppins';

export const lineGraph = {
  options: {
    responsive: true,
    legend: { display: false },
    plugins: {
      legend: { position: 'bottom' },
      title: { display: false, text: 'Data' },
    },
  },
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Questions Contributed per month',
        data: [
          { x: 'January', y: 200 },
          { x: 'February', y: 100 },
          { x: 'March', y: 900 },
          { x: 'April', y: 500 },
          { x: 'May', y: 700 },
          { x: 'June', y: 300 },
          { x: 'July', y: 800 },
        ],
        borderColor: '#005CE6',
        backgroundColor: '#005CE6',
      },
    ],
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
        backgroundColor: ['#335DE6', '#1B1C1E'],
        borderColor: ['#DEE3F5', '#000000'],
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
