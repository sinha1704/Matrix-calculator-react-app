// src/App.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import MatrixCalculator from './Components/MatrixCalculator';

const App: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h5" gutterBottom>
       React js Matrix Calculator Application
      </Typography>
      <MatrixCalculator />
    </Container>
  );
};

export default App;
