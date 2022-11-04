import {createSlice} from '@reduxjs/toolkit';

export interface CounterState {
  portfolioSummaryData: [];
}

const initialState: any = {
  portfolioData: '',
};

export const portfolioSummarySlice = createSlice({
  name: 'portfolioSummary',
  initialState,
  reducers: {
    storePortfolioSummaryData: (state, action: any) => {
      state.portfolioData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {storePortfolioSummaryData} = portfolioSummarySlice.actions;

export default portfolioSummarySlice.reducer;
