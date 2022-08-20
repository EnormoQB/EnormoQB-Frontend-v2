import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useGetStatsQuery } from '../../redux/services/statsApi';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutGraph = () => {
  const { data: standardsQCount } = useGetStatsQuery();

  const data = {
    labels: ['X Class Questions Percentage', 'XII Class Questions Percentage'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          standardsQCount?.data?.classDistribution[1].percent,
          standardsQCount?.data?.classDistribution[0].percent,
        ],
        color: '#005CE6',
        backgroundColor: ['#005CE6', '#DEE3F5'],
        borderColor: ['#005CE6', '#DEE3F5'],
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

        const fontSize = (height / 150).toFixed(2);
        ctx.font = `${fontSize}em Poppins`;
        ctx.textBaseline = 'top';
        const text1 = `${standardsQCount.data.totalQuestions}`;
        const textX = Math.round((width - ctx.measureText(text1).width) / 2);
        const textY = height / 3;
        ctx.fillText(text1, textX, textY);

        const fontSize1 = (height / 300).toFixed(2);
        ctx.font = `${fontSize1}em Poppins`;
        ctx.textBaseline = 'top';
        const text2 = 'Total Questions';
        const textX2 = Math.round((width - ctx.measureText(text1).width) / 3.3);
        const textY2 = height / 2.1;
        ctx.fillText(text2, textX2, textY2);
        ctx.save();
      },
    },
  ];

  return (
    <Doughnut
      style={{ maxWidth: '300px', maxHeight: '330px' }}
      data={data}
      options={options}
      plugins={plugins}
    />
  );
};

export default DoughnutGraph;
