import { Container, Grid, Button, Typography } from '@mui/material';
import Sidebar from './components/Sidebar';
import IncidentTable from './components/IncidentTable';
import IncidentCard from './components/IncidentCard';
import IncidentCard3 from './components/IncidentCard3';
import IncidentByMonth from './components/IncidentByMonth'; 
import SelectVariants from './components/SelectVariants';
import IncidentCard2 from './components/IncidentCard2';
import IncidentChart from './components/IncidentChart';
import Incident from './components/Incident';
import DoughnutCard from './components/DoughnutCard';
import './App.css';

function App() {
  return (
    <>
      <header>
        <Sidebar />
      </header>
      <div style={{ display: 'flex' }}>
        <Container maxWidth={false} disableGutters sx={{ paddingX: 3, paddingY: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <IncidentCard title = 'Incidentes Abertos do Presente Mês' />
            </Grid>

            <Grid item xs={12} md={4}>
              <IncidentCard2 title = 'Incidentes Fechados do Presente Mês' />
            </Grid>
            <Grid item xs={12} md={4}>
              <IncidentCard3 title = 'Porcentagem em Relação ao Mês Passado' />
            </Grid>
            <Grid item xs={12} md={4}>
              <IncidentChart />
            </Grid>
            <Grid item xs={12} md={4}>
              <IncidentByMonth /> 
            </Grid>
            <Grid item xs={12} md={4}>
              <DoughnutCard /> 
            </Grid>
            <Grid item xs={12} md={12}>
              <SelectVariants />
            </Grid>
            <Grid item xs={12} md={12}>
              <IncidentTable />
            </Grid>

            <Grid item xs={12}>
              <Incident />
            </Grid>
            <Grid /* Histórias US05 e US04- SQUAD 1 
            - Implementar Mapa
            - Filtrar pelo nome da agência e por região
            - Olhar os itens filhos no Jira
            */ >
            </Grid>
            <Grid /* Histórias US06 - SQUAD 2
            - Implementar lista
            - Filtrar pelo CEP(incident_zip)
            - Olhar os itens filhos no Jira 
            */> </Grid>
            <Grid item xs={12} style={{ marginTop: '20px', textAlign: 'right' }}>
              <Button variant="contained" color="primary">Exportar Relatório</Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default App;