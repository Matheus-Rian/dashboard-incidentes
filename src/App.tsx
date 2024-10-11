import React from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';
import Sidebar from './components/Sidebar';
import IncidentCard from './components/IncidentCard';
import IncidentChart from './components/IncidentChart'; // Certifique-se de que esse componente existe
import IncidentByMonth from './components/IncidentByMonth'; // Componente que usa a API de incidentes de Nova York

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom style={{ marginTop: '40px', marginBottom: '40px'}}>
          Dashboard de Incidentes de Segurança
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <IncidentCard title="Quantidade de Incidentes" value="365" percentage="+24%" />
          </Grid>
          <Grid item xs={12} md={6}>
            <IncidentCard title="Incidentes Resolvidos" value="217" percentage="-17%" />
          </Grid>

          <Grid item xs={12}>
            <IncidentChart />
          </Grid>

          <Grid item xs={12}>
            <IncidentByMonth /> {/* Substituindo o BarChartCard estático pelo componente que usa API */}
          </Grid>

          <Grid item xs={12} style={{ marginTop: '20px', textAlign: 'right' }}>
            <Button variant="contained" color="primary">Exportar Relatório</Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;