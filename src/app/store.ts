import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import devicesReducer from '../features/devices/deviceSlice';
import coursesReducer from '../features/courses/courseSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    devices: devicesReducer,
    courses: coursesReducer,
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
