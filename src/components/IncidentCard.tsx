import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface IncidentCardProps {
  title: string;
  value: string;
  percentage: string;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ title, value, percentage }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4">
          {value} incidentes
        </Typography>
        <Typography variant="subtitle1" color={percentage.startsWith('-') ? 'error' : 'green'}>
          {percentage}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default IncidentCard;