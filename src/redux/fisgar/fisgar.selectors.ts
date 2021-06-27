import memoize from 'fast-memoize';

import { RootState } from '../root.reducer';

export const getFisgarData = memoize(
  (state: RootState) => state.fisgarState.fisgarData,
);

export const getMapLayers = memoize(
  (state: RootState) => state.fisgarState.mapLayers,
);

export const getLoading = memoize(
  (state: RootState) => state.fisgarState.isLoading,
);

export const getFisgarMessage = memoize(
  (state: RootState) => state.fisgarState.fisgarMessage,
);
