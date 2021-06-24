import { combineReducers, createStore } from 'redux';

import { CommonEnum } from '../constants';
import fisgarReducer from './reducers/fisgar/fisgar.reducer';

export default createStore(
  combineReducers({
    [CommonEnum.Fisgar]: fisgarReducer,
  }),
);
