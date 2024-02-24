import {
  EmpProfileType,
  EmployeePayloadType,
  EmployeesResponse,
  NotificationPayloadType,
  NotificationType,
  OffsetPayload,
  OrgDashboardPayload,
  OrgDashboardResponse,
  OrganizationMachinesPayloadType,
  OrganizationProfileType,
  OrganizationVehiclesPayloadType,
  VoucherApiResponse,
} from '../../enums/organization';
import {apiSlice} from '../apiSlice';

const orgnaisationEndpoint = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTips: builder.query({
      query: () => `/auth/employee/tips`,
      providesTags: ['EmpTips'],
    }),
    getEmployees: builder.query<EmployeesResponse, EmployeePayloadType>({
      query: (data: any) =>
        `/organisation/employees/${data.orgId}?page=1&limit=1000&supervisor=${data.supervisor}&employee=${data.employee}`,
      providesTags: ['Employees'],
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

    //offsets endpoints
    getOrgOffsets: builder.query<OffsetPayload, string>({
      query: orgId => `/super/getOffsetByOrgId/${orgId}`,
      providesTags: ['OrgOffsets'],
    }),
    getOrgVouchers: builder.query<VoucherApiResponse, string>({
      query: orgId => `/organisation/myvouchers/${orgId}`,
      providesTags: ['OrgVouchers'],
    }),

    //Support Api
    submitSupport: builder.mutation({
      query: data => ({
        url: `/contactus`,
        method: 'POST',
        body: data,
      }),
    }),

    //Settings

    removeSupervisor: builder.mutation({
      query: empId => ({
        url: `/organisation/supervisor/${empId}?add=false`,
        method: 'PUT',
      }),
      invalidatesTags: ['Employees'],
    }),
    addSupervisor: builder.mutation({
      query: empId => ({
        url: `/organisation/supervisor/${empId}?add=true`,
        method: 'PUT',
      }),
      invalidatesTags: ['Employees'],
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
  useGetOrgOffsetsQuery,
  useGetOrgVouchersQuery,
  useSubmitSupportMutation,
  useRemoveSupervisorMutation,
  useAddSupervisorMutation,
} = orgnaisationEndpoint;
