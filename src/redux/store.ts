import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import rootReducer from './root.reducer';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.address'],
      ignoredPaths: ['fisgarState.fisgarData'],
    },
  }),
  logger,
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
