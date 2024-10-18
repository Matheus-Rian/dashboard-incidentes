import React from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';
import Sidebar from './components/Sidebar';
import IncidentTable from './components/IncidentTable';
import IncidentCard from './components/IncidentCard';
import IncidentCard2 from './components/IncidentCard2';
import IncidentChart from './components/IncidentChart';
import IncidentByMonth from './components/IncidentByMonth';
import Incident from './components/Incident';

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
            <IncidentCard title = 'Incidentes Abertos do Presente Mês' />
          </Grid>

          <Grid item xs={12} md={6}>
            <IncidentCard2 title = 'Incidentes Fechados do Presente Mês' />
          </Grid>

          <Grid item xs={12}>
            <IncidentChart />
          </Grid>

          <Grid item xs={12}>
            <IncidentByMonth /> 
          </Grid>

          <Grid item xs={12}>
            <IncidentTable />
          </Grid>

          <Grid item xs={12}>
            <Incident />
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