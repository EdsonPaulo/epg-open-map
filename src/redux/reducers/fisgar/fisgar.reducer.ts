import { createReducer } from '@reduxjs/toolkit';

import { ActionTypes } from '../../redux.types';
import { setData } from './fisgar.reducer-helpers';
import { FisgarState } from './fisgar.types';

const INITIAL_STATE: FisgarState = {
  name: '',
  email: '',
  cpf: '',
  message: '',
  address: null,
};

const fisgarReducer = createReducer<FisgarState>(INITIAL_STATE, {
  [ActionTypes.SET_DATA]: setData,
});

export default fisgarReducer;
