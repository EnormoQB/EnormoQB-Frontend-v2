import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
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
};

const DonutGraph = () => {
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default DonutGraph;
