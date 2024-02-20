import {
  NotificationPayloadType,
  NotificationType,
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
    getNotifications: builder.query<NotificationPayloadType, string>({
      query: orgId => `/notification/list/${orgId}?type=organization`,
      providesTags: ['Notifications'],
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
  useGetNotificationsQuery,
  useGetTipsQuery,
  useGetEmployeesQuery,
  useGetOrgDashboardMutation,
} = orgnaisationEndpoint;
