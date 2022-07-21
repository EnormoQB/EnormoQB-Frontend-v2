import React from 'react';
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
import { Flex } from '@chakra-ui/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  legend: {
    display: false,
  },
  //   maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
      text: 'Data',
    },
  },
};

ChartJS.defaults.scale.grid.display = false;

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const data = {
  labels,
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
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const LineGraph = () => {
  return (
    <Flex w='60%'>
      <Line options={options} data={data} />
    </Flex>
  );
};

export default LineGraph;
