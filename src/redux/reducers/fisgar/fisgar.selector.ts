import memoize from 'fast-memoize';

import { State } from '../../redux.types';

export const getAddress = memoize((state: State) => state.fisgar.address);
export const getData = memoize((state: State) => state.fisgar);
