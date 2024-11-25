import { useEffect, useState } from 'react';
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
import 'chart.js/auto';
import { Card, CardContent, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AgencyIncidentBarChart = () => {
  const [data, setData] = useState<{ agency: string; count: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [complaintType, setComplaintType] = useState<string>('');
  const [borough, setBorough] = useState<string>('');
  const [filters, setFilters] = useState<{ complaintType: string; borough: string }>({
    complaintType: '',
    borough: '',
  });

  const fetchIncidentData = async () => {
    try {
      setLoading(true);

      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

      const whereClauses = [
        `created_date >= '${lastMonth.toISOString().split('T')[0]}'`,
        `agency IS NOT NULL`,
        filters.complaintType && `complaint_type = '${filters.complaintType}'`,
        filters.borough && `borough = '${filters.borough}'`,
      ].filter(Boolean);

      const whereClause = encodeURIComponent(whereClauses.join(' AND '));
      const url = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=agency,count(*) as count&$where=${whereClause}&$group=agency&$limit=1000000`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Falha ao carregar dados');

      const result = await response.json();

      const formattedData = result.map((item: any) => ({
        agency: item.agency,
        count: parseInt(item.count, 10),
      }));

      setData(formattedData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidentData();
  }, [filters]);

  const handleFilterChange = () => {
    setFilters({ complaintType, borough });
  };

  const chartData = {
    labels: data.map(d => d.agency),
    datasets: [
      {
        label: 'Quantidade de Incidentes',
        data: data.map(d => d.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const filterStyles = {
    height: '50px', // Reduz a altura do FormControl
    '& .MuiInputLabel-root': {
      transform: 'translate(14px, 8px) scale(1)',  // Ajusta posição do label
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',  // Ajusta posição do label quando minimizado
    },
    '& .MuiSelect-select': {
      paddingTop: '8px',    // Reduz padding interno do select
      paddingBottom: '8px',
    },
  };

  const buttonStyles = {
    height: '35px',  // Ajusta altura do botão para combinar
    minWidth: '100px', // Largura mínima do botão
    marginLeft: '8px',  // Espaçamento à esquerda
    marginBottom: '12px',
  };

  return (
    <Card style={{maxHeight: '293px'}}>
      <CardContent style={{ paddingTop: '2px' }}>
        <Typography variant="h6" gutterBottom >
          Quantidade de Incidentes por Agência
        </Typography>

        <div style={{ 
          display: 'flex', 
          gap: '8px',
          alignItems: 'center',  // Alinha items verticalmente
          height: '40px'         // Altura fixa para o container
        }}>
          <FormControl style={{ minWidth: 120 }} sx={filterStyles}>
            <InputLabel>Tipos de Incidente</InputLabel>
            <Select
              value={complaintType}
              onChange={e => setComplaintType(e.target.value)}
              label="Tipos de Incidente"
              size="small"  // Adiciona size small
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Noise - Residential">Ruído Residencial</MenuItem>
              <MenuItem value="Illegal Parking">Estacionamento Ilegal</MenuItem>
              <MenuItem value="HEAT/HOT WATER">Água Quente</MenuItem>
              <MenuItem value="Blocked Driveway">Rua Bloqueada</MenuItem>
              <MenuItem value="Street Condition">Condição da Rua</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{ minWidth: 120 }} sx={filterStyles}>
            <InputLabel>Distritos</InputLabel>
            <Select
              value={borough}
              onChange={e => setBorough(e.target.value)}
              label="Distritos"
              size="small"  // Adiciona size small
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="MANHATTAN">Manhattan</MenuItem>
              <MenuItem value="BROOKLYN">Brooklyn</MenuItem>
              <MenuItem value="QUEENS">Queens</MenuItem>
              <MenuItem value="BRONX">Bronx</MenuItem>
              <MenuItem value="STATEN ISLAND">Staten Island</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleFilterChange}
            sx={buttonStyles}
          >
            Filtrar
          </Button>
        </div>

        {loading && <Typography>Carregando dados...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && <Bar data={chartData} />}
      </CardContent>
    </Card>
  );
};

export default AgencyIncidentBarChart;
