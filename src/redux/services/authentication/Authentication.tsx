import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import navigationStrings from '../../../constants/navigationStrings';

export const AuthenticationApi = createApi({
  reducerPath: 'authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: navigationStrings.BASE_URL,
  }),

  endpoints: builder => ({
    //   SIGNUP API
    Signup: builder.mutation<any, any>({
      query: ({formData}) => {
        return {
          url: 'v3/auth/signup',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: formData,
          method: 'POST',
        };
      },
    }),

    // LOGIN API
    Login: builder.mutation<any, any>({
      query: data => {
        console.log('new data : ', data);
        return {
          url: 'v3/auth/login',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: {
            ...data,
            role: 'user',
          },
        };
      },
    }),

    // FORGET PASSWORD
    ForgetPass: builder.mutation<any, any>({
      query: data => {
        console.log('new data in RTK Query : ', data);
        return {
          url: 'users/forgot/password',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: data,
          method: 'POST',
        };
      },
    }),

    //   OPEN DASHBOARD API
    OpenDashboard: builder.mutation<any, any>({
      query: data => {
        console.log('new data in RTQ : ', data);
        return {
          url: 'users/profile',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`,
          },
          body: data.data,
          method: 'PUT',
        };
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useSignupMutation,
  useForgetPassMutation,
  useOpenDashboardMutation,
} = AuthenticationApi;
