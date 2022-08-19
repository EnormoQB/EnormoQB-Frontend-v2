import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

ChartJS.defaults.scale.grid.display = false;
ChartJS.defaults.font.family = 'Poppins';

const LineGraph = ({ contribution }) => {
  const options = {
    responsive: true,
    legend: { display: false },
    plugins: {
      legend: { position: 'bottom' },
      title: { display: false, text: 'Data' },
    },
  };
  const config = {
    labels: contribution.map((item) => item._id),
    datasets: [
      {
        label: 'Questions Contribution',
        data: contribution.map((item) => ({
          x: item._id,
          y: item.totalQuestion,
        })),
        borderColor: '#005CE6',
        backgroundColor: '#005CE6',
      },
    ],
  };

  return <Line options={options} data={config} />;
};

export default LineGraph;
