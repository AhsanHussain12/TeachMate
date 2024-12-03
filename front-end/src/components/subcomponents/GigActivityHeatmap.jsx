import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components for chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GigActivityHeatmap = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Gig Activity',
        data: data.activity,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { type: 'category' },
      y: { type: 'linear' },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold">Gig Activity Heatmap</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default GigActivityHeatmap;
