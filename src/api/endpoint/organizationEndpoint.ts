import {apiSlice} from '../apiSlice';

const orgnaisationEndpoint = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTips: builder.query({
      query: () => `/auth/employee/tips`,
      providesTags: ['EmpTips'],
    }),
    getMyRedeemRequests: builder.query({
      query: () => `/auth/employee/tips`,
      providesTags: ['RedeemRequests'],
    }),
    createOrganisation: builder.mutation({
      query: data => ({
        url: `/organisation/auth/signup`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['EmpDashboard'],
    }),
  }),
});

export const {
  useCreateOrganisationMutation,
  useGetMyRedeemRequestsQuery,
  useGetTipsQuery,
} = orgnaisationEndpoint;
