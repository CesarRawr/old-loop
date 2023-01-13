import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store';
import { prestamos } from '../../../datatest/data';
import type { Prestamo } from '../../../datatest/models';

///////////////////////////
// State
///////////////////////////
const initialState: LoanState = {
  prestamo: {
    observaciones: '',
    status: 'activo',
    maestro: {
      _id: '',
      nombre: '',
    },
    materia: {
      _id: '',
      nombre: '',
      nrc: '',
      horario: {
        aula: '',
        horaInicio: 0,
        horaFin: 0,
        dia: 'lunes',
      },
    },
    dispositivos: [],
    usuario: {
      _id: '',
      nickname: '',
    },
    timelog: {
      inicio: new Date(),
      fin: new Date(),
    },
    alumno: {
      _id: '',
      matricula: '',
      nombre: '',
    },
  },
  status: 'idle',
}

///////////////////////////
// Async functions
///////////////////////////

// Function to upload loan
export const uploadLoan = createAsyncThunk('loan/uploadLoan', async (prestamo: Prestamo) => {
  prestamos.push(prestamo);
});

///////////////////////////
// Slice
///////////////////////////
export const courseSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadLoan.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadLoan.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(uploadLoan.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

///////////////////////////
// Interfaces
///////////////////////////
export interface Alumno {
  _id?: string;
  matricula: string;
  nombre: string;
}

interface Horario {
  readonly aula: string;
  readonly horaInicio: number;
  readonly horaFin: number;
  readonly dia: "lunes" | "martes" | "miercoles" | "jueves" | "viernes";
}

export interface LoanState {
  prestamo: Prestamo;
  status: 'idle' | 'loading' | 'failed';
}

