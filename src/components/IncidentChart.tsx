import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const IncidentChart: React.FC = () => {
  const [incidentData, setIncidentData] = useState<{ borough: string; incident_count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidentData = async () => {
      try {
        const today = new Date();
        const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0];
        const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];

        const apiUrl = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=borough, count(*) as incident_count&$where=created_date between '${firstDayOfLastMonth}' and '${firstDayOfCurrentMonth}'&$group=borough&$order=borough`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }

        const data = await response.json();
        setIncidentData(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidentData();
  }, []);

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  if (incidentData.length === 0) {
    return <Typography>Nenhum incidente encontrado para o mês passado.</Typography>;
  }

  const chartData = {
    labels: incidentData
      .filter((incident) => incident.borough && incident.borough !== 'Unspecified')
      .map((incident) => incident.borough),
    datasets: [
      {
        label: 'Incidentes',
        data: incidentData
          .filter((incident) => incident.borough && incident.borough !== 'Unspecified')
          .map((incident) => parseInt(incident.incident_count, 10)),
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <Card >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Incidentes por Borough (Mês Passado)
        </Typography>
        <Bar data={chartData} options={chartOptions} />
      </CardContent>
    </Card>
  );
};

export default IncidentChart;
