import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  Auth_Response: {},
};

export const authSlice = createSlice({
  name: 'auth_response',
  initialState,
  reducers: {
    storeAuth: (state, action) => {
      state.Auth_Response = action.payload;
    },
  },
});

export const {storeAuth} = authSlice.actions;

export default authSlice.reducer;
