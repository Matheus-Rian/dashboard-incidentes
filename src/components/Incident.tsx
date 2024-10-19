import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, CircularProgress, Container } from '@mui/material';

interface Incident {
  unique_key: string;
  incident_address: string;
  street_name: string;
  cross_street_1: string;
  cross_street_2: string;
  intersection_street_1: string;
  intersection_street_2: string;
  address_type: string;
  city: string;
  landmark: string;
  facility_type: string;
  created_date: string;
  status: string;
  due_date: string;
  resolution_description: string;
  resolution_action_updated_date: string;
  community_board: string;
  bbl: string;
  borough: string;
  x_coordinate_state_plane: string;
  y_coordinate_state_plane: string;
  open_data_channel_type: string;
  closed_date: string;
  park_facility_name: string;
  park_borough: string;
  agency: string;
  vehicle_type: string;
  taxi_company_borough: string;
  taxi_pick_up_location: string;
  bridge_highway_name: string;
  bridge_highway_direction: string;
  road_ramp: string;
  bridge_highway_segment: string;
  agency_name: string;
  latitude: string;
  longitude: string;
  location: any; 
  complaint_type: string;
  descriptor: string;
  location_type: string;
  incident_zip: string;
}

const IncidentReport: React.FC = () => {
  const [uniqueKey, setUniqueKey] = useState<string>('');
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchIncident = async () => {
    setLoading(true);
    try {
      const apiUrl = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?unique_key=${uniqueKey}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Erro ao buscar dados');
      const data: Incident[] = await response.json();
      setIncident(data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ marginTop: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Unique Key"
          variant="outlined"
          value={uniqueKey}
          onChange={(e) => setUniqueKey(e.target.value)}
          style={{ marginRight: '16px' }}
        />
        <Button variant="contained" onClick={fetchIncident} disabled={!uniqueKey}>
          Buscar
        </Button>
      </div>
      {loading ? (
        <CircularProgress style={{ margin: '16px' }} />
      ) : incident ? (
        <Card style={{ marginTop: '16px' }}>
          <CardContent>
            <Typography variant="h6">Relatório do Incidente</Typography>
            {Object.entries(incident).map(([key, value]) => (
              <Typography key={key}>
                <strong>{key.replace(/_/g, ' ')}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
              </Typography>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Typography style={{ marginTop: '16px' }}>Nenhum incidente encontrado</Typography>
      )}
    </Container>
  );
};

export default IncidentReport;