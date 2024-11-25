import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface BarChartCardProps {
  title: string;
  data: { name: string; value: number }[];
}

const BarChartCard: React.FC<BarChartCardProps> = ({ title, data }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Incidentes',
        data: data.map(item => item.value),
        backgroundColor: 'rgba(135, 134, 216, 0.6)',
        borderColor: 'rgba(135, 134, 216, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
          <Line data={chartData} options={options} />
      </CardContent>
    </Card>
  );
};

export default BarChartCard;