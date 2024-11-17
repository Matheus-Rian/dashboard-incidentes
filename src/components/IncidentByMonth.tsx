import { useEffect, useState, useCallback, useMemo } from 'react';
import BarChartCard from './BarChartCard';

interface IncidentData {
  month: string;
  incident_count: string;
}

interface ChartData {
  name: string;
  value: number;
}

const IncidentByMonth = () => {
  const [barChartData, setBarChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Memoize date calculations
  const { startDate, endDate } = useMemo(() => {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth());
    const oneYearAgo = new Date(lastMonth.getFullYear() - 1, lastMonth.getMonth(), 1);

    return {
      startDate: oneYearAgo.toISOString().split('T')[0],
      endDate: lastMonth.toISOString().split('T')[0]
    };
  }, []);

  // Construct API URL with proper encoding
  const apiUrl = useMemo(() => {
    const baseUrl = 'https://data.cityofnewyork.us/resource/erm2-nwe9.json';
    const whereClause = encodeURIComponent(`created_date between '${startDate}' and '${endDate}'`);
    
    return `${baseUrl}?$select=date_trunc_ym(created_date) as month, count(*) as incident_count&$where=${whereClause}&$group=month&$order=month`;
  }, [startDate, endDate]);

  const transformData = useCallback((rawData: IncidentData[]): ChartData[] => {
    return rawData.map(entry => ({
      name: new Date(entry.month).toLocaleString('default', { month: 'long' }),
      value: parseInt(entry.incident_count, 10),
    }));
  }, []);

  // Function to retry failed requests
  const fetchWithRetry = useCallback(async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-App-Token': 'REPLACE_WITH_YOUR_APP_TOKEN', // Se você tiver um token da API
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Dados recebidos em formato inválido');
      }

      const formattedData = transformData(data);
      setBarChartData(formattedData);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Erro na requisição:', error);
      
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setError(`Tentativa ${retryCount + 1} de 3 falhou. Tentando novamente...`);
        setTimeout(() => {
          fetchWithRetry();
        }, 2000 * Math.pow(2, retryCount)); // Exponential backoff
      } else {
        setError('Não foi possível carregar os dados após várias tentativas. Por favor, verifique sua conexão e tente novamente.');
        setLoading(false);
      }
    }
  }, [apiUrl, transformData, retryCount]);

  // Mock data for fallback
  const getMockData = useCallback((): ChartData[] => {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return months.map(month => ({
      name: month,
      value: Math.floor(Math.random() * 1000) + 100,
    }));
  }, []);

  useEffect(() => {
    let mounted = true;

    const initFetch = async () => {
      try {
        await fetchWithRetry();
      } catch (error) {
        if (mounted) {
          console.error('Erro final:', error);
          // Fallback para dados mock se todas as tentativas falharem
          setBarChartData(getMockData());
          setError('Usando dados de exemplo devido a erro de conexão');
          setLoading(false);
        }
      }
    };

    initFetch();

    return () => {
      mounted = false;
    };
  }, [fetchWithRetry, getMockData]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setRetryCount(0);
    fetchWithRetry();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-pulse">
          Carregando dados... {retryCount > 0 && `(Tentativa ${retryCount} de 3)`}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        <h3>Erro ao carregar dados</h3>
        <p>{error}</p>
        <button
          onClick={handleRetry}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return <BarChartCard title="Incidentes por Mês" data={barChartData} />;
};

export default IncidentByMonth;