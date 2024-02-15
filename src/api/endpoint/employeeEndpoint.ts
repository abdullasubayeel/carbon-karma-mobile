import {apiSlice} from '../apiSlice';

const employeeEndpoint = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTips: builder.query({
      query: () => `/auth/employee/tips`,
      providesTags: ['EmpTips'],
    }),
    getMyRedeemRequests: builder.query({
      query: () => `/auth/employee/tips`,
      providesTags: ['RedeemRequests'],
    }),
    getEmployeeDashboard: builder.mutation({
      query: data => ({
        url: `/user/developer`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['EmpDashboard'],
    }),
  }),
});

export const {
  useGetEmployeeDashboardMutation,
  useGetMyRedeemRequestsQuery,
  useGetTipsQuery,
} = employeeEndpoint;
