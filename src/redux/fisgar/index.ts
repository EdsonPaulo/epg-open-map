import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CommonEnum } from '../../constants';
import { FisgarMessage, FisgarState, IFisgarData } from './fisgar.types';

export const initialState: FisgarState = {
  fisgarData: null,
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
    setFisgarData: (state, { payload }: PayloadAction<IFisgarData | null>) => {
      state.fisgarData = payload ? { ...payload } : null;
    },
    setFisgarMessage: (
      state,
      { payload }: PayloadAction<FisgarMessage | null>,
    ) => {
      state.fisgarMessage = payload;
    },
  },
});

export const { setFisgarData, setIsLoading, setFisgarMessage } =
  fisgarSlice.actions;

export default fisgarSlice.reducer;
