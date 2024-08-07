import { configureStore } from '@reduxjs/toolkit';
import scenarioListSliceReducer from './scenarioListSlice';

export const store = configureStore({
  reducer: {
    scenarioList: scenarioListSliceReducer,
  },
});
