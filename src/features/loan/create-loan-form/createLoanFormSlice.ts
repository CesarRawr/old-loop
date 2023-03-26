import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import type { Prestamo, CreateLoanState } from "@models/interfaces";
import { urlBase } from "../../../variables";
import axios from "axios";

///////////////////////////
// State
///////////////////////////
const initialState: CreateLoanState = {
  prestamo: {
    observaciones: "",
    status: "activo",
    maestro: {
      _id: "",
      nombre: "",
    },
    materia: {
      _id: "",
      nombre: "",
      nrc: "",
      horario: {
        aula: "",
        horaInicio: 0,
        horaFin: 0,
        dia: "lunes",
      },
    },
    dispositivos: [],
    usuario: {
      _id: "",
      nickname: "",
    },
    timelog: {
      inicioOriginal: new Date().toString(),
      inicio: new Date().toString(),
      fin: new Date().toString(),
    },
  },
  isLoading: false,
  error: false,
};

///////////////////////////
// Async functions
///////////////////////////

// Function to upload loan
export const uploadLoan = createAsyncThunk(
  "loan/uploadLoan",
  async (prestamo: Prestamo) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data, status } = await axios.post(
      `${urlBase}/v1/loan`,
      prestamo,
      config
    );
    return {
      data,
      status,
    };
  }
);

///////////////////////////
// Slice
///////////////////////////
export const createLoanSlice = createSlice({
  name: "createLoan",
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
export const { setIsLoading } = createLoanSlice.actions;

///////////////////////////
// Selectors
///////////////////////////
export const selectLoanIsLoading = (state: RootState) =>
  state.createLoan.isLoading;
