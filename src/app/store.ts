import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import devicesReducer from '../features/devices/deviceSlice';
import coursesReducer from '../features/courses/courseSlice';
import dialogReducer from '../features/dialog/dialogSlice';
import createLoanReducer from '../features/loan/create-loan-form/createLoanFormSlice';
import activeLoansListReducer from '../features/loan/active-loans-list/activeLoansListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    devices: devicesReducer,
    courses: coursesReducer,
    dialog: dialogReducer,
    createLoan: createLoanReducer,
    activeLoans: activeLoansListReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
