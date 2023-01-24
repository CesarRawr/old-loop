import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import type { Prestamo } from '../../../datatest/models';
import {urlBase} from '../../../variables';
import axios from 'axios';

///////////////////////////
// State
///////////////////////////
const initialState: LoanState = {
  selectedLoan: undefined,
  status: 'idle',
}

///////////////////////////
// Async functions
///////////////////////////

// Function to modify loan devices
export const modifyLoan = createAsyncThunk('loan/modifyLoan', async (prestamo: Prestamo) => {
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
export const slice = createSlice({
  name: 'modifyLoan',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
    setSelectedLoan: (state, action: PayloadAction<Prestamo | undefined>) => {
      state.selectedLoan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(modifyLoan.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(modifyLoan.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(modifyLoan.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default slice.reducer;

///////////////////////////
// Actions
///////////////////////////
export const {setStatus, setSelectedLoan} = slice.actions;

///////////////////////////
// Selectors
///////////////////////////
export const selectStatus = (state: RootState) => state.modifyLoan.status;
export const selectedLoan = (state: RootState) => state.modifyLoan.selectedLoan;

///////////////////////////
// Interfaces
///////////////////////////
export interface Alumno {
  _id?: string;
  matricula: string;
  nombre: string;
}

type StatusType = 'loading' | 'idle' | 'failed'
export interface LoanState {
  selectedLoan?: Prestamo;
  status: StatusType;
}
