import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

///////////////////////////
// State
///////////////////////////
const initialState: DialogState = {
  isOpen: false,
  title: '',
  description: '',
  acceptOptions: {
    isOptionEnabled: false,
    callbackData: {},
    callback: '() => {}',
  },
}

///////////////////////////
// Slice
///////////////////////////
export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    close: (state) => {
      state.isOpen = false;
    },
    open: (state) => {
      state.isOpen = true;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setAcceptOptions: (state, action: PayloadAction<AcceptOption>) => {
      state.acceptOptions = action.payload;
    }
  }
});

///////////////////////////
// Actions
///////////////////////////
export const {close, open, setTitle, setDescription, setAcceptOptions} = dialogSlice.actions;

///////////////////////////
// Selectors
///////////////////////////
export const selectIsOpen = (state: RootState) => state.dialog.isOpen;
export const selectTitle = (state: RootState) => state.dialog.title;
export const selectDescription = (state: RootState) => state.dialog.description;
export const selectAcceptOptions = (state: RootState) => state.dialog.acceptOptions;

///////////////////////////
// Reducer
///////////////////////////
export default dialogSlice.reducer;

///////////////////////////
// Interfaces
///////////////////////////
export interface AcceptOption {
  isOptionEnabled: boolean;
  callbackData: any;
  callback: string;
}

export interface DialogState {
  isOpen: boolean;
  title: string;
  description: string;
  acceptOptions: AcceptOption;
}
