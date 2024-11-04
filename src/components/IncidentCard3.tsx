import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface IncidentComparisonCardProps {
  title: string;
}

const IncidentComparisonCard: React.FC<IncidentComparisonCardProps> = ({ title }) => {
  const [percentageChange, setPercentageChange] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0];
    const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];

    const fetchIncidentData = async () => {
      try {
        const lastMonthUrl = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=count(*) as count&$where=closed_date IS NOT NULL AND closed_date >= '${firstDayOfLastMonth}' AND closed_date < '${firstDayOfThisMonth}'`;
        const responseLastMonth = await fetch(lastMonthUrl);
        if (!responseLastMonth.ok) {
          throw new Error('Erro ao buscar dados do mês passado');
        }
        const dataLastMonth = await responseLastMonth.json();
        const lastMonthCount = dataLastMonth.length > 0 ? parseInt(dataLastMonth[0].count, 10) : 0;

        const currentMonthUrl = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=count(*) as count&$where=closed_date IS NOT NULL AND closed_date >= '${firstDayOfCurrentMonth}'`;
        const responseCurrentMonth = await fetch(currentMonthUrl);
        if (!responseCurrentMonth.ok) {
          throw new Error('Erro ao buscar dados do mês atual');
        }
        const dataCurrentMonth = await responseCurrentMonth.json();
        const currentMonthCount = dataCurrentMonth.length > 0 ? parseInt(dataCurrentMonth[0].count, 10) : 0;

        const change = lastMonthCount
          ? ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100
          : 0;

        setPercentageChange(change);
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

  const isIncrease = percentageChange !== null && percentageChange > 0;
  const color = isIncrease ? 'red' : 'green';
  const displayChange = percentageChange !== null ? Math.abs(percentageChange).toFixed(2) : '0';

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" style={{ color }}>
          {isIncrease ? `+${displayChange}%` : `-${displayChange}%`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default IncidentComparisonCard;
