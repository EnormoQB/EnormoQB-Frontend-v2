import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { doughnutGraph } from './config';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutGraph = () => {
  return (
    <Doughnut
      data={doughnutGraph.data}
      options={doughnutGraph.options}
      plugins={doughnutGraph.plugins}
    />
  );
};

export default DoughnutGraph;
