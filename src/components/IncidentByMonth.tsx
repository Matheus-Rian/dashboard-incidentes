import React, { useEffect, useState } from 'react';
import BarChartCard from './BarChartCard';

const IncidentByMonth = () => {
  const [barChartData, setBarChartData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth());
    const oneYearAgo = new Date(lastMonth.getFullYear() - 1, lastMonth.getMonth(), 1);

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0]; 
    };

    const startDate = formatDate(oneYearAgo); 
    const endDate = formatDate(lastMonth);

    const apiUrl = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=date_trunc_ym(created_date)%20as%20month,%20count(*)%20as%20incident_count&$where=created_date%20between%20'${startDate}'%20and%20'${endDate}'&$group=month&$order=month`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((entry: any) => ({
          name: new Date(entry.month).toLocaleString('default', { month: 'long' }),
          value: parseInt(entry.incident_count, 10),
        }));

        setBarChartData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return <BarChartCard title="Incidentes por Mês" data={barChartData} />;
};

export default IncidentByMonth;