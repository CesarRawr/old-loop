import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store';
import type { Prestamo } from '../../../datatest/models';
import { prestamos } from '../../../datatest/data';
import {urlBase} from '../../../variables';
import axios from 'axios';

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
      inicio: new Date().toString(),
      fin: new Date().toString(),
    },
    alumno: {
      _id: '',
      matricula: '',
      nombre: '',
    },
  },
  isLoading: false,
  error: false,
}

///////////////////////////
// Async functions
///////////////////////////

// Function to upload loan
export const uploadLoan = createAsyncThunk('loan/uploadLoan', async (prestamo: Prestamo) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const {data, status} = await axios.post(`${urlBase}/v1/loan`, prestamo, config);
  return {
    data,
    status,
  };
});

///////////////////////////
// Slice
///////////////////////////
export const createLoanSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadLoan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadLoan.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(uploadLoan.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default createLoanSlice.reducer;

///////////////////////////
// Actions
///////////////////////////
export const {setIsLoading} = createLoanSlice.actions;

///////////////////////////
// Selectors
///////////////////////////
export const selectLoanIsLoading = (state: RootState) => state.createLoan.isLoading;

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
  isLoading: boolean;
  error: boolean;
}

