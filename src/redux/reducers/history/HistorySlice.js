import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    storeHistoryData: (state, action) => {
      if (action.payload === null) {
        state.data = [];
      } else {
        let actionData = action.payload;
        state.data = [...state.data, actionData];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeHistoryData} = historySlice.actions;

export default historySlice.reducer;
