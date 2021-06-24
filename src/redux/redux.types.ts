import { CommonEnum } from '../constants';
import { FisgarState } from './reducers/fisgar/fisgar.types';

export enum ActionTypes {
  SET_DATA = 'SET_DATA',
}

export interface State {
  [CommonEnum.Fisgar]: FisgarState;
}

export type Reducer<S, A> = (state: S, action: A) => S;
