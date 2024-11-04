import { Container, Grid, Button, Typography } from '@mui/material';
import Sidebar from './components/Sidebar';
import IncidentTable from './components/IncidentTable';
import IncidentCard from './components/IncidentCard';
import IncidentByMonth from './components/IncidentByMonth'; 
import SelectVariants from './components/SelectVariants';
import IncidentCard2 from './components/IncidentCard2';
import IncidentChart from './components/IncidentChart';
import Incident from './components/Incident';
import './App.css';

function App() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <Sidebar className="sidebar" />
      </header>

      {/* Conteúdo Principal */}
      <div className="app-container">
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom className="app-title">
            Dashboard de Incidentes de Segurança
          </Typography>

          <Grid container spacing={3}>
            {/* Cartões de Incidentes */}
            <Grid item xs={12} md={6}>
              <IncidentCard title="Incidentes Abertos do Presente Mês" className="incident-card" />
            </Grid>
            <Grid item xs={12} md={6}>
              <IncidentCard2 title="Incidentes Fechados do Presente Mês" className="incident-card" />
            </Grid>

            {/* Filtros e Gráficos */}
            <Grid item xs={12}>
              <SelectVariants />
            </Grid>
            <Grid item xs={12}>
              <div className="chart-container">
                <IncidentChart />
              </div>
            </Grid>
            <Grid item xs={12}>
              <IncidentByMonth />
            </Grid>

            {/* Tabela e Lista de Incidentes */}
            <Grid item xs={12}>
              <IncidentTable />
            </Grid>
            <Grid item xs={12}>
              <Incident />
            </Grid>

            {/* Placeholder para Implementações Futuras */}
            <Grid /* Histórias US05 e US04- SQUAD 1 */ />
            <Grid /* Histórias US06 - SQUAD 2 */ />

            {/* Botão de Exportação */}
            <Grid item xs={12} className="button-container">
              <Button className="export-button" variant="contained">Exportar Relatório</Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default App;
