import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
function Sidebar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#000' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">
          Dashboard de Incidentes
        </Typography>
        
        <Box>
          <Button sx={{backgroundColor: '#303030'}} color="inherit" component ={Link} to ="/landing">Sobre Nós</Button>
          <Button sx={{backgroundColor: '#303030'}} color="inherit" component ={Link} to ="/dashboard" >Teste nosso demo</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Sidebar;