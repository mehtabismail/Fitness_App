import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import Loading from './reducers/loading/Loading';
import authSlice from './reducers/auth/AuthSlice';
import userSlice from './reducers/auth/UserSlice';
import HistorySlice from './reducers/history/HistorySlice';

export const store = configureStore({
  reducer: {
    // ALL REDUCERS
    auth: authSlice,
    user: userSlice,
    history: HistorySlice,
    loading: Loading,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
