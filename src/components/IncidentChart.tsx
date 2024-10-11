import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale, // Importa a escala de categorias
  Tooltip,
  Legend,
} from 'chart.js';

// Registre os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const data = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
  datasets: [
    {
      label: 'Roubos',
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: 'rgba(75,192,192,1)',
    },
    {
      label: 'Furtos',
      data: [28, 48, 40, 19, 86, 27],
      fill: false,
      borderColor: '#742774',
    },
  ],
};

const IncidentChart: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quantidade por tipo de incidente
        </Typography>
        <Line data={data} />
      </CardContent>
    </Card>
  );
};

export default IncidentChart;