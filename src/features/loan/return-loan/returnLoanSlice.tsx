import axios from "axios";
import { urlBase } from "../../../variables";
import type { StatusType } from "@models/types";
import type { ReturnLoanState } from "@models/interfaces";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

///////////////////////////
// State
///////////////////////////
const initialState: ReturnLoanState = {
  status: "idle",
};

///////////////////////////
// Async functions
///////////////////////////

// Function to return loan
export const returnLoan = createAsyncThunk(
  "loan/returnLoan",
  async (loanID: string) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.patch(
      `${urlBase}/v1/loan/return`,
      { loanID },
      config
    );
    return data;
  }
);

///////////////////////////
// Slice
///////////////////////////
export const slice = createSlice({
  name: "returnLoan",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(returnLoan.pending, (state) => {
        state.status = "loading";
      })
      .addCase(returnLoan.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(returnLoan.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default slice.reducer;

///////////////////////////
// Actions
///////////////////////////
export const { setStatus } = slice.actions;
