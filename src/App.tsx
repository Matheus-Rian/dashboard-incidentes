import { Container, Grid, Button, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import IncidentTable from './components/IncidentTable';
import IncidentCard from './components/IncidentCard';
import IncidentCard3 from './components/IncidentCard3';
import IncidentByMonth from './components/IncidentByMonth'; 
import AgencyBarChart from './components/AgencyBarchart.tsx';
import IncidentCard2 from './components/IncidentCard2';
import IncidentChart from './components/IncidentChart';
import Incident from './components/Incident';
import DoughnutCard from './components/DoughnutCard';
import Map from './components/map';
import Page from './components/page.tsx';
import Index from './pages/Home/index.tsx'
import './App.css';
import './App.tsx';


function App() {
  return (
    <Router>
      {/* Header */}
      <header className="header">
        <Sidebar className="sidebar" />
      </header>
      <div style={{ display: 'flex' }}>
        <Container maxWidth={false} disableGutters sx={{ paddingX: 3, paddingY: 3 }}>
          <Routes>
            
            <Route path="/dashboard" element={<HomePage/>} />
            
      
            <Route path="/landing" element={<Index/>} />

          
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <IncidentCard title='Incidentes Abertos do Presente Mês' />
      </Grid>
      <Grid item xs={12} md={4}>
        <IncidentCard2 title='Incidentes Fechados do Presente Mês' />
      </Grid>
      <Grid item xs={12} md={4}>
        <IncidentCard3 title='Porcentagem em Relação ao Mês Passado' />
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
      <Grid item xs={12} md={8}>
        <Map />
      </Grid>
      <Grid item xs={12} md={4}>
        <AgencyBarChart /> 
      </Grid>
      <Grid item xs={12} md={12}>
        <IncidentTable />
      </Grid>
      <Grid item xs={12}>
        <Incident />
      </Grid>
      <Grid item xs={12} className="button-container">
        <Button className="export-button" variant="contained">Exportar Relatório</Button>
      </Grid>
    </Grid>
  );
}

export default App;