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

  const isInputValid = (value: string | number) => {
    const num = Number(value);
    return !isNaN(num) && num >= 0 && Number.isInteger(num);
  };

  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isInputValid(value)) {
      setRows(Number(value));
      setError('');
    } else {
      setRows('');
      setError('Rows and Columns must be non-negative integers.');
    }
  };

  const handleColChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isInputValid(value)) {
      setCols(Number(value));
      setError('');
    } else {
      setCols('');
      setError('Rows and Columns must be non-negative integers.');
    }
  };

  const generateMatrices = () => {
    if (!isInputValid(rows) || !isInputValid(cols)) {
      setError('Row and column values must be non-negative integers');
      return;
    }

    const numRows = Number(rows);
    const numCols = Number(cols);
    const newMatrix1: number[][] = [];
    const newMatrix2: number[][] = [];

    for (let i = 0; i < numRows; i++) {
      const row1: number[] = [];
      const row2: number[] = [];
      for (let j = 0; j < numCols; j++) {
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
    const numRows = Number(rows);
    const numCols = Number(cols);
    const newSumMatrix: number[][] = [];

    for (let i = 0; i < numRows; i++) {
      const row: number[] = [];
      for (let j = 0; j < numCols; j++) {
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
            {Array.from({ length: Number(cols) }).map((_, index) => (
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

  const allButtonsDisabled = !isInputValid(rows) || !isInputValid(cols) || Number(rows) <= 0 || Number(cols) <= 0;

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <TextField
            label="Rows"
            type="number"
            value={rows}
            onChange={handleRowChange}
            error={!!error && !isInputValid(rows)}
            helperText={error && !isInputValid(rows) ? error : ''}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Columns"
            type="number"
            value={cols}
            onChange={handleColChange}
            error={!!error && !isInputValid(cols)}
            helperText={error && !isInputValid(cols) ? error : ''}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={generateMatrices} disabled={allButtonsDisabled}>
            Generate
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={clearMatrices} disabled={allButtonsDisabled}>
            Clear
          </Button>
        </Grid>
      </Grid>
      {error && <Alert severity="error">{error}</Alert>}
      <br />
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
