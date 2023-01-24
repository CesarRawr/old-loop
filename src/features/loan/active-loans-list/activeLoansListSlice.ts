import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import type { Prestamo } from '../../../datatest/models';
import {urlBase} from '../../../variables';
import axios from 'axios';

///////////////////////////
// State
///////////////////////////
const initialState: LoanState = {
  activeLoans: [],
  selectedLoan: {
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
  status: 'loading'
}

///////////////////////////
// Async functions
///////////////////////////

// Function to getActiveLoans
export const fetchActiveLoans = createAsyncThunk('loan/getActiveLoans', async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const {data, status} = await axios.get(`${urlBase}/v1/loans/active`, config);
  return data.data;
});

///////////////////////////
// Slice
///////////////////////////
export const activeLoansListSlice = createSlice({
  name: 'activeLoansList',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchActiveLoans.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchActiveLoans.fulfilled, (state, action) => {
      state.status = 'idle';
      state.activeLoans = action.payload;
    })
    .addCase(fetchActiveLoans.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export default activeLoansListSlice.reducer;

///////////////////////////
// Actions
///////////////////////////
export const {setStatus} = activeLoansListSlice.actions;

///////////////////////////
// Selectors
///////////////////////////
export const selectStatus = (state: RootState) => state.activeLoans.status;
export const selectActiveLoans = (state: RootState) => state.activeLoans.activeLoans;

///////////////////////////
// Interfaces
///////////////////////////
type StatusType = 'loading' | 'idle' | 'failed';
export interface LoanState {
  activeLoans: Prestamo[];
  selectedLoan: Prestamo;
  status: StatusType;
}

