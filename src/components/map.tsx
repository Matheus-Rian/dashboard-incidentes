import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Definição do tipo para os dados do heatmap
interface IncidentPoint {
  lat: number;
  lng: number;
  intensity: number;
}

// Componente interno para adicionar a camada de calor
const HeatmapLayer = ({ points }: { points: IncidentPoint[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;

    const heatData = points.map(point => [
      point.lat,
      point.lng,
      point.intensity
    ]);

    const heat = (L as any).heatLayer(heatData, {
      radius: 25,
      blur: 15,
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const defaultCenter = useMemo(() => ({ lat: 40.7128, lng: -74.0060 }), []); // NYC coordinates

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        // Calcula a data de um mês atrás
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        
        const whereClause = encodeURIComponent(
          `created_date >= '${lastMonth.toISOString().split('T')[0]}' 
           AND latitude IS NOT NULL 
           AND longitude IS NOT NULL`
        );
        
        const url = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=latitude,longitude,count(*)&$where=${whereClause}&$group=latitude,longitude&$limit=100000`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha ao carregar dados');

        const data = await response.json();
        
        // Normaliza as intensidades para um range de 0-1
        const counts = data.map((d: any) => parseInt(d.count, 10));
        const maxCount = Math.max(...counts);
        
        const heatmapPoints = data
          .filter((point: any) => point.latitude && point.longitude)
          .map((point: any) => ({
            lat: parseFloat(point.latitude),
            lng: parseFloat(point.longitude),
            intensity: parseInt(point.count, 10) / maxCount // Normaliza a intensidade
          }));

        setPoints(heatmapPoints);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Erro ao carregar dados');
        console.error('Erro detalhado:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div style={{ animation: 'pulse 2s infinite' }}>Carregando mapa de calor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: '#ef4444', padding: '16px' }}>
        <h3>Erro ao carregar mapa</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{
      height: '600px',
      width: '100%',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <MapContainer
        center={defaultCenter}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
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