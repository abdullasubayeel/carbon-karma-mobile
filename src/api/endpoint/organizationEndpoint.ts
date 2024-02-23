import {
  EmpProfileType,
  NotificationPayloadType,
  NotificationType,
  OrgDashboardPayload,
  OrgDashboardResponse,
  OrganizationMachinesPayloadType,
  OrganizationProfileType,
  OrganizationVehiclesPayloadType,
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
    }),

    getEmployeeProfile: builder.query<EmpProfileType, string>({
      query: empId => `/profile/${empId}`,
      providesTags: ['EmpProfile'],
    }),
    getOrgProfile: builder.query<OrganizationProfileType, string>({
      query: orgId => `/organisation/${orgId}`,
      providesTags: ['OrgProfile'],
    }),
    getOrgVehicles: builder.query<OrganizationVehiclesPayloadType, string>({
      query: orgId => `/organisation/orgVehicle/org/${orgId}`,
      providesTags: ['OrgVehicles'],
    }),
    getOrgMachines: builder.query<OrganizationMachinesPayloadType, string>({
      query: orgId => `/organisation/orgMachine/org/${orgId}`,
      providesTags: ['OrgMachines'],
    }),
    getCountries: builder.query({
      query: () => `/country`,
      providesTags: ['Countries'],
    }),
    getStates: builder.query({
      query: id => `/state/${id}`,
      providesTags: ['States'],
    }),
    updateProfile: builder.mutation({
      query: data => ({
        url: `/profile/${data.empId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['EmpProfile'],
    }),
  }),
});

export const {
  useCreateOrganisationMutation,
  useGetNotificationsQuery,
  useGetTipsQuery,
  useGetEmployeesQuery,
  useGetEmployeeProfileQuery,
  useGetOrgProfileQuery,
  useGetOrgDashboardMutation,
  useUpdateProfileMutation,
  useGetOrgVehiclesQuery,
  useGetOrgMachinesQuery,
  useGetCountriesQuery,
  useLazyGetStatesQuery,
} = orgnaisationEndpoint;
