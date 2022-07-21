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
import { lineGraph } from './config';

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

const LineGraph = () => {
  return <Line options={lineGraph.options} data={lineGraph.data} />;
};

export default LineGraph;
