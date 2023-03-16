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
  selectedLoanIndex: -1,
  selectedLoanIsDisabled: false,
  status: 'loading',
}

///////////////////////////
// Async functions
///////////////////////////

// Function to getActiveLoans
export const fetchActiveLoans = createAsyncThunk('loan/getActiveLoans', async (arg, {dispatch}) => {
  dispatch(setSelectedLoanIndex(-1));
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
    setActiveLoans: (state, action: PayloadAction<Prestamo[]>) => {
      state.activeLoans = action.payload;
    },
    setSelectedLoanIndex: (state, action: PayloadAction<number>) => {
      state.selectedLoanIndex = action.payload;
    },
    setSelectedLoanIsDisabled: (state, action: PayloadAction<boolean>) => {
      state.selectedLoanIsDisabled = action.payload;
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
export const {
  setStatus, 
  setActiveLoans,
  setSelectedLoanIndex, 
  setSelectedLoanIsDisabled
} = activeLoansListSlice.actions;

///////////////////////////
// Selectors
///////////////////////////
export const selectStatus = (state: RootState) => state.activeLoans.status;
export const selectActiveLoans = (state: RootState) => state.activeLoans.activeLoans;
export const selectSelectedLoanIndex = (state: RootState) => state.activeLoans.selectedLoanIndex;
export const selectSelectedLoanIsDisabled = (state: RootState) => state.activeLoans.selectedLoanIsDisabled;

///////////////////////////
// Interfaces
///////////////////////////
export type StatusType = 'loading' | 'idle' | 'failed';
export interface LoanState {
  activeLoans: Prestamo[];
  selectedLoanIndex: number;
  selectedLoanIsDisabled: boolean;
  status: StatusType;
}

