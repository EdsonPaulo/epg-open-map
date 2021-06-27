import { combineReducers } from '@reduxjs/toolkit';

import fisgarState from './fisgar';

const rootReducer = combineReducers({
  fisgarState,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
