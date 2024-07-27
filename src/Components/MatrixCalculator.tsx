// src/components/MatrixCalculator.tsx
import React, { useState } from 'react';
import {
  Container, TextField, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow,
  Typography, Alert
} from '@mui/material';

const MatrixCalculator: React.FC = () => {
  const [rows, setRows] = useState<number | string>('');
  const [cols, setCols] = useState<number | string>('');
  const [matrix1, setMatrix1] = useState<number[][]>([]);
  const [matrix2, setMatrix2] = useState<number[][]>([]);
  const [sumMatrix, setSumMatrix] = useState<number[][]>([]);
  const [error, setError] = useState<string>('');

  const generateMatrices = () => {
    const rowsNum = Number(rows);
    const colsNum = Number(cols);

    if (rowsNum < 0 || colsNum < 0) {
      setError('Row and column values must be non-negative');
      return;
    }

    if (!Number.isInteger(rowsNum) || !Number.isInteger(colsNum)) {
      setError('Row and column values must be integers');
      return;
    }

    const newMatrix1: number[][] = [];
    const newMatrix2: number[][] = [];

    for (let i = 0; i < rowsNum; i++) {
      const row1: number[] = [];
      const row2: number[] = [];
      for (let j = 0; j < colsNum; j++) {
        row1.push(i + j);
        row2.push(i * j);
      }
      newMatrix1.push(row1);
      newMatrix2.push(row2);
    }

    setMatrix1(newMatrix1);
    setMatrix2(newMatrix2);
    setSumMatrix([]);
    setError('');
  };

  const addMatrices = () => {
    const newSumMatrix: number[][] = [];

    for (let i = 0; i < matrix1.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < matrix1[i].length; j++) {
        row.push(matrix1[i][j] + matrix2[i][j]);
      }
      newSumMatrix.push(row);
    }

    setSumMatrix(newSumMatrix);
  };

  const clearMatrices = () => {
    setRows('');
    setCols('');
    setMatrix1([]);
    setMatrix2([]);
    setSumMatrix([]);
    setError('');
  };

  const renderTable = (matrix: number[][], title: string) => (
    <>
      <Typography variant="h6">{title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            {Array.from({ length: cols as number }).map((_, index) => (
              <TableCell key={index}>Col {index + 1}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {matrix.map((row, rowIndex) => (
            <TableRow key={rowIndex} style={{ background: rowIndex % 2 === 0 ? 'linear-gradient(to right, #f0f0f0, #ffffff)' : 'linear-gradient(to right, #ffffff, #f0f0f0)' }}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <TextField
            label="Rows"
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            error={!!error && (Number(rows) < 0 || !Number.isInteger(Number(rows)))}
            helperText={error && (Number(rows) < 0 || !Number.isInteger(Number(rows))) ? error : ''}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Columns"
            type="number"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            error={!!error && (Number(cols) < 0 || !Number.isInteger(Number(cols)))}
            helperText={error && (Number(cols) < 0 || !Number.isInteger(Number(cols))) ? error : ''}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={generateMatrices}>
            Generate
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={clearMatrices}>
            Clear All
          </Button>
        </Grid>
      </Grid>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{matrix1.length > 0 && renderTable(matrix1, 'Matrix 1 (Sum of Indices)')}</Grid>
        <Grid item>{matrix2.length > 0 && renderTable(matrix2, 'Matrix 2 (Product of Indices)')}</Grid>
      </Grid>
      <br />
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={addMatrices} disabled={matrix1.length === 0 || matrix2.length === 0}>
            Add Matrices
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{sumMatrix.length > 0 && renderTable(sumMatrix, 'Sum Matrix')}</Grid>
      </Grid>
    </Container>
  );
};

export default MatrixCalculator;
