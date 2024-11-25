import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncidentDoughnutChart: React.FC = () => {
  const [incidentData, setIncidentData] = useState<{ complaint_type: string; incident_count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidentData = async () => {
      try {
        const today = new Date();
        const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0];
        const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];

        const apiUrl = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=complaint_type, count(*) as incident_count&$where=created_date between '${firstDayOfLastMonth}' and '${firstDayOfCurrentMonth}'&$group=complaint_type&$order=incident_count DESC`;

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

  const topFiveIncidents = incidentData.slice(0, 5);
  const othersCount = incidentData.slice(5).reduce((sum, incident) => sum + Number(incident.incident_count), 0);

  const chartData = {
    labels: [...topFiveIncidents.map((incident) => incident.complaint_type), 'Outros'],
    datasets: [
      {
        label: 'Incidentes',
        data: [...topFiveIncidents.map((incident) => Number(incident.incident_count)), othersCount],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#C9CBCF',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "right" as "top" | "bottom" | "left" | "right" | "center" | "chartArea",
      },
    },
  };

  return (
    <Card style={{maxHeight: '293px'}}>
      <CardContent style={{ maxWidth:'500', height: '300px', padding: '16px' }}>
        <Typography variant="h6" gutterBottom style={{ marginBottom: '1px' }}>
          Top 5 Tipos de Reclamações (Mês Passado)
        </Typography>
        <Doughnut data={chartData} options={chartOptions} />
      </CardContent>
    </Card>
  );
};

export default IncidentDoughnutChart;
