import { Action } from 'redux';

import { Reducer } from '../../redux.types';
import { FisgarAcionPayload, FisgarState } from './fisgar.types';

export const setData: Reducer<FisgarState, Action<FisgarAcionPayload>> = (
  state,
  action,
) => ({
  ...state,
  ...action.type,
});
