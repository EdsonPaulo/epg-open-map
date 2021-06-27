import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CommonEnum, ILayer } from '../../constants';
import { FisgarMessage, FisgarState, IFisgarDataPayload } from './fisgar.types';

export const initialState: FisgarState = {
  fisgarData: {},
  mapLayers: [],
  isLoading: false,
  fisgarMessage: null,
};

export const fisgarSlice = createSlice({
  name: CommonEnum.Fisgar,
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    setFisgarData: (state, { payload }: PayloadAction<IFisgarDataPayload>) => {
      state.fisgarData = state.fisgarData
        ? { ...state.fisgarData, ...payload }
        : { ...payload };
    },

    setMapLayers: (state, { payload }: PayloadAction<ILayer[]>) => {
      state.mapLayers = [
        ...payload,
        ...state.mapLayers.filter(sl => {
          let pass = true;
          payload.forEach(pl => {
            if (pl.id === sl.id) pass = false;
          });
          return pass;
        }),
      ];
    },

    setFisgarMessage: (
      state,
      { payload }: PayloadAction<FisgarMessage | null>,
    ) => {
      state.fisgarMessage = payload;
    },
  },
});

export const { setFisgarData, setMapLayers, setIsLoading, setFisgarMessage } =
  fisgarSlice.actions;

export default fisgarSlice.reducer;
