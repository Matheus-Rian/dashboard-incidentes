import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface IncidentCardProps {
  title: string;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ title }) => {
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]; 
    
    const apiUrl = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=count(*) as count&$where=closed_date IS NOT NULL AND closed_date >= '${firstDayOfCurrentMonth}'`;
    
    const fetchIncidentData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();
        const count = data.length > 0 ? parseInt(data[0].count, 10) : 0;
        setCurrentCount(count);
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

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4">
          {currentCount} incidentes
        </Typography>
      </CardContent>
    </Card>
  );
};

export default IncidentCard;