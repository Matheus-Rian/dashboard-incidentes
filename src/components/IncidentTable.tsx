import React, { useEffect, useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

interface Incident {
  incident_zip: string;
  borough: string; 
  closed_date: string | null;
  agency_name: string;
  unique_key: string; 
}

const IncidentTable: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [zipFilter, setZipFilter] = useState<string>('');
  const [boroughFilter, setBoroughFilter] = useState<string>(''); 
  const [agencyFilter, setAgencyFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const incidentsPerPage = 10;
  const [loading, setLoading] = useState<boolean>(true);

  const fetchIncidents = async (page: number, zip: string, borough: string, agency: string) => {
    setLoading(true);
    try {
      const offset = page * incidentsPerPage;
      let apiUrl = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?$limit=${incidentsPerPage}&$offset=${offset}`;
      if (zip) {
        apiUrl += `&$where=incident_zip LIKE '%${zip}%'`;
      }
      if (borough) {
        apiUrl += `&borough=${borough}`;
      }
      if (agency) {
        apiUrl += `&agency_name=${agency}`;
      }
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Erro ao buscar dados');
      const data: Incident[] = await response.json();
      setIncidents(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents(currentPage, zipFilter, boroughFilter, agencyFilter);
  }, [currentPage]);

  const handlePageChange = (direction: 'next' | 'prev') => {
    setCurrentPage(prev => {
      if (direction === 'next') return prev + 1;
      if (prev > 0) return prev - 1;
      return 0;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setCurrentPage(0); 
      fetchIncidents(0, zipFilter, boroughFilter, agencyFilter);
    }
  };

  const formatDate = (dateString: string | null) => {
    return dateString ? new Date(dateString).toLocaleString() : 'Não fechado';
  };

  const memoizedTable = useMemo(() => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Código Postal</TableCell>
            <TableCell>Bairro</TableCell> 
            <TableCell>Data de Fechamento</TableCell>
            <TableCell>Agência</TableCell>
            <TableCell>Chave Única</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {incidents.map((incident, index) => (
            <TableRow key={index}>
              <TableCell>{incident.incident_zip}</TableCell>
              <TableCell>{incident.borough}</TableCell> 
              <TableCell>{formatDate(incident.closed_date)}</TableCell>
              <TableCell>{incident.agency_name}</TableCell>
              <TableCell>{incident.unique_key}</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ), [incidents]);

  return (
    <Paper>
      <TextField
        label="Filtrar pelo Código Postal"
        variant="outlined"
        value={zipFilter}
        onChange={(e) => setZipFilter(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ margin: '16px', width: '300px' }}
      />
      <TextField
        label="Filtrar pelo Bairro"
        variant="outlined"
        value={boroughFilter}
        onChange={(e) => setBoroughFilter(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ margin: '16px', width: '300px' }}
      />
      <TextField
        label="Filtrar pelo Nome da Agência"
        variant="outlined"
        value={agencyFilter}
        onChange={(e) => setAgencyFilter(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ margin: '16px', width: '300px' }}
      />
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      ) : (
        memoizedTable
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px' }}>
        <Button variant="contained" onClick={() => handlePageChange('prev')} disabled={currentPage === 0}>
          Anterior
        </Button>
        <Button
          variant="contained"
          onClick={() => handlePageChange('next')}
          disabled={incidents.length < incidentsPerPage}
        >
          Próximo
        </Button>
      </div>
    </Paper>
  );
};

export default IncidentTable;