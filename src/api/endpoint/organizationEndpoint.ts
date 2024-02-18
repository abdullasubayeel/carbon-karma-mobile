import {
  OrgDashboardPayload,
  OrgDashboardResponse,
} from '../../enums/organization';
import {apiSlice} from '../apiSlice';

const orgnaisationEndpoint = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTips: builder.query({
      query: () => `/auth/employee/tips`,
      providesTags: ['EmpTips'],
    }),
    getEmployees: builder.query({
      query: orgId =>
        `/organisation/employees/${orgId}?page=1&limit=1000&supervisor=false&employee=false`,
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
    }),
    getOrgDashboard: builder.mutation<
      OrgDashboardResponse,
      OrgDashboardPayload
    >({
      query: data => ({
        url: `/organisation/dashboard`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['OrgDashboard'],
    }),
  }),
});

export const {
  useCreateOrganisationMutation,
  useGetMyRedeemRequestsQuery,
  useGetTipsQuery,
  useGetEmployeesQuery,
  useGetOrgDashboardMutation,
} = orgnaisationEndpoint;
