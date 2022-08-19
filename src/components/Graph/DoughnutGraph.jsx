import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useGetStatsQuery } from '../../redux/services/statsApi';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutGraph = () => {
  const { data: standardsQCount } = useGetStatsQuery();

  const data = {
    labels: ['XIIth Standard Questions', 'Xth Standard Questions'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          standardsQCount?.data?.classDistribution[0].percent,
          standardsQCount?.data?.classDistribution[1].percent,
        ],
        color: '#005CE6',
        backgroundColor: ['#DEE3F5', '#005CE6'],
        borderColor: ['#DEE3F5', '#005CE6'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    plugins: {
      legend: { position: 'bottom' },
      title: { display: false, text: 'Data' },
    },
    cutout: 100,
  };

  const plugins = [
    {
      beforeDraw(chart) {
        const { width } = chart;
        const { height } = chart;
        const { ctx } = chart;
        ctx.restore();
        const fontSize = (height / 100).toFixed(2);
        ctx.font = `${fontSize}em Poppins`;
        ctx.textBaseline = 'top';
        const text = `${standardsQCount.data.totalQuestions}`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 3;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  return <Doughnut data={data} options={options} plugins={plugins} />;
};

export default DoughnutGraph;
