import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

interface IncidentPoint {
  lat: number;
  lng: number;
  intensity: number;
}

const HeatmapLayer = ({ points }: { points: IncidentPoint[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;

    const heatData = points.map(point => [point.lat, point.lng, point.intensity]);

    const heat = (L as any).heatLayer(heatData, {
      radius: 7,
      blur: 5,
      maxZoom: 10,
      max: 1.0,
      gradient: {
        0.4: '#ffffb2',
        0.6: '#fd8d3c',
        0.7: '#f03b20',
        0.8: '#bd0026',
        1.0: '#710017'
      }
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
};

const IncidentHeatmap = () => {
  const [points, setPoints] = useState<IncidentPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [complaintType, setComplaintType] = useState<string>('');
  const [borough, setBorough] = useState<string>('');
  const [filters, setFilters] = useState<{ complaintType: string; borough: string }>({
    complaintType: '',
    borough: '',
  });

  const defaultCenter = useMemo(() => ({ lat: 40.7128, lng: -74.0060 }), []);

  const fetchIncidents = async () => {
    try {
      setLoading(true);

      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

      const whereClauses = [
        `created_date >= '${lastMonth.toISOString().split('T')[0]}'`,
        `latitude IS NOT NULL`,
        `longitude IS NOT NULL`,
      ];
  
      if (filters.complaintType && !filters.borough) {
        whereClauses.push(`complaint_type = '${filters.complaintType}'`);
      } else if (!filters.complaintType && filters.borough) {
        whereClauses.push(`borough = '${filters.borough}'`);
      } else if (filters.complaintType && filters.borough) {
        whereClauses.push(`complaint_type = '${filters.complaintType}'`);
        whereClauses.push(`borough = '${filters.borough}'`);
      }

      const whereClause = encodeURIComponent(whereClauses.join(' AND '));
      const url = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=latitude,longitude,count(*) as count&$where=${whereClause}&$group=latitude,longitude,complaint_type,borough&$limit=100000`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Falha ao carregar dados');

      const data = await response.json();

      const counts = data.map((d: any) => parseInt(d.count, 10));
      const maxCount = Math.max(...counts);

      const heatmapPoints = data
        .filter((point: any) => point.latitude && point.longitude)
        .map((point: any) => ({
          lat: parseFloat(point.latitude),
          lng: parseFloat(point.longitude),
          intensity: parseInt(point.count, 10) / maxCount,
        }));

      setPoints(heatmapPoints);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar dados');
      console.error('Erro detalhado:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [filters]);

  const handleFilterChange = () => {
    setFilters({ complaintType, borough });
  };

  return (
    <div style={{ position: 'relative', height: '293px', width: '100%' }}>
      {/* Filtros sobrepostos */}
      <div
        style={{
          position: 'absolute',
          zIndex: 1000,
          top: '10px',
          left: '10px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <select
          value={complaintType}
          onChange={e => setComplaintType(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', marginRight: '8px' }}
        >
          <option value="">Tipos de Incidente</option>
          <option value="Noise">Ruído</option>
          <option value="Illegal Parking">Estacionamento Ilegal</option>
          <option value="HEAT/HOT WATER">Água Quente</option>
          <option value="Blocked Driveway">Rua Bloqueda</option>
          <option value="Street Condition">Condição da Rua</option>
        </select>

        <select
          value={borough}
          onChange={e => setBorough(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', marginRight: '8px' }}
        >
          <option value="">Distritos</option>
          <option value="MANHATTAN">Manhattan</option>
          <option value="BROOKLYN">Brooklyn</option>
          <option value="QUEENS">Queens</option>
          <option value="BRONX">Bronx</option>
          <option value="STATEN ISLAND">Staten Island</option>
        </select>

        <button
          onClick={handleFilterChange}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Filtrar
        </button>
      </div>

      {/* Mensagem de carregamento sobreposta */}
      {loading && (
        <div
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '1.2rem',
          }}
        >
          Carregando...
        </div>
      )}

      {/* Mapa de calor */}
      <MapContainer
        center={defaultCenter}
        zoom={9}
        style={{ height: '100%', width: '100%', borderRadius: '4px' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatmapLayer points={points} />
      </MapContainer>
    </div>
  );
};

export default IncidentHeatmap;
