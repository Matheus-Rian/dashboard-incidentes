import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

type SidebarProps = {
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#000' }} className={className}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">
          Dashboard de Incidentes
        </Typography>

        <Box>
          <Button sx={{ backgroundColor: '#303030' }} color="inherit" component={Link} to="/">
            Sobre Nós
          </Button>
          <Button sx={{ backgroundColor: '#303030' }} color="inherit" component={Link} to="/dashboard">
            Teste nosso demo
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Sidebar;