import React from 'react';
import { List, ListItemText, Drawer, Box, Typography } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton'; // Use ListItemButton no lugar de ListItem com button

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
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
  );
}

export default Sidebar;