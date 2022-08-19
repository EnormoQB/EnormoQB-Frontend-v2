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
        label: 'Questions Contributed',
        data: contribution.map((item) => ({
          x: item._id,
          y: item.totalQuestion,
        })),
        borderColor: '#005CE6',
        backgroundColor: '#005CE6',
      },
      {
        label: 'Questions Rejected',
        data: [29, 92, 50, 23, 60, 100, 225, 102, 40],
        borderColor: '#b0c1f2',
        backgroundColor: '#b0c1f2',
      },
      {
        label: 'Questions Pending',
        data: [50, 25, 30, 100, 200, 85, 90, 250, 210],
        borderColor: '#7CAEF8',
        backgroundColor: '#7CAEF8',
      },
    ],
  };

  return <Line options={options} data={config} />;
};

export default LineGraph;
