import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import navigationStrings from '../../../constants/navigationStrings';

export const PortfolioSummaryApi = createApi({
  reducerPath: 'portfolioSummary',
  baseQuery: fetchBaseQuery({
    baseUrl: navigationStrings.BASE_URL,
  }),

  endpoints: builder => ({
    // PORTFOLIO SUMMARY API ON DASHBOARD
    PortfolioSummary: builder.query<any, any>({
      query: data => {
        console.log('api started  : ', data);
        return {
          url: 'v3/wallets/list/accounts',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODE0LCJlbWFpbCI6ImFhc2l5YS5yaWF6KzcwQG9wdGltdXNmb3guY29tIiwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNjY0Mjc2OTU2fQ.S-5v60jWiWWPWhUlnpj-EzGnwZimeKeX9mHjEl8EbuI',
          },
          method: 'GET',
        };
      },
    }),
  }),
});
export const {usePortfolioSummaryQuery} = PortfolioSummaryApi;
