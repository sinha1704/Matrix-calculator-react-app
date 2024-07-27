// src/App.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import MatrixCalculator from './Components/MatrixCalculator';
import { fontSize, fontWeight } from '@mui/system';

const App: React.FC = () => {
  return (
    <Container  >
      <Typography variant="h5" component="h6" gutterBottom style={
        {
          paddingTop:"20px",
          paddingBottom:"20px",
          paddingRight:"10px",
          paddingLeft:"10px", 
          color:"#DE12F5",
          fontWeight:"550"
        }
      }>
       React js Matrix Calculator Application
      </Typography>
      <MatrixCalculator />
    </Container>
  );
};

export default App;
