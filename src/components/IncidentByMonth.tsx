import React, { useEffect, useState } from 'react';
import BarChartCard from './BarChartCard';

const IncidentByMonth = () => {
  const [barChartData, setBarChartData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://data.cityofnewyork.us/resource/erm2-nwe9.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        return response.json();
      })
      .then((incidents) => {
        const incidentCountsByMonth: { [key: string]: number } = {};

        incidents.forEach((incident: any) => {
          if (incident.created_date) {
            const date = new Date(incident.created_date);
            const month = date.toLocaleString('default', { month: 'long' });

            if (incidentCountsByMonth[month]) {
              incidentCountsByMonth[month] += 1;
            } else {
              incidentCountsByMonth[month] = 1;
            }
          }
        });

        const formattedData = Object.keys(incidentCountsByMonth).map((month) => ({
          name: month,
          value: incidentCountsByMonth[month],
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