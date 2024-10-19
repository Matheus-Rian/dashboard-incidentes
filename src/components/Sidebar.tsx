//import React from 'react';
import { List, ListItemText, Drawer, Box, Typography, ListItemButton } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <MenuIcon 
        onClick={toggleDrawer(true)}
      />
      <Drawer
        open={open} 
        onClose={toggleDrawer(false)}
        sx={{
          width: 120,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 180,
            boxSizing: 'border-box',
            backgroundColor: '#ececec',
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <Typography variant="h5" style={{ padding: '20px', textAlign: 'center' }}>
            Dashboard
          </Typography>
          <List>
            <ListItemButton>
              <ListItemText primary="🏠Home" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="📊Analytics" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="🛒Products" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;