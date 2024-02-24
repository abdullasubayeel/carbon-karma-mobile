import {EmployeeSurveysResponse} from '../../enums/employee';
import {apiSlice} from '../apiSlice';

const employeeEndpoint = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTips: builder.query({
      query: () => `/auth/employee/tips`,
      providesTags: ['EmpTips'],
    }),

    getEmployeeDashboard: builder.mutation({
      query: data => ({
        url: `/auth/employee/dashboard`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['EmpDashboard'],
    }),
  }),
});

export const {useGetEmployeeDashboardMutation, useGetTipsQuery} =
  employeeEndpoint;
