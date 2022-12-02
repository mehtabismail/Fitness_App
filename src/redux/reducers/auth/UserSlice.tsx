import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
};

export const userSlice = createSlice({
  name: 'user_data',
  initialState,
  reducers: {
    storeUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {storeUserData} = userSlice.actions;

export default userSlice.reducer;
