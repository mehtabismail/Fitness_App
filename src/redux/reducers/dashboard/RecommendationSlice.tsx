import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  recommendationsData: '',
};

export const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    storeRecommendationData: (state, action) => {
      state.recommendationsData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeRecommendationData} = recommendationSlice.actions;

export default recommendationSlice.reducer;
