import {
  OrgDashboardPayload,
  OrgDashboardResponse,
} from '../../enums/organization';
import {apiSlice} from '../apiSlice';

const orgnaisationEndpoint = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSubmittedSurveys: builder.query({
      query: orgId => `organisation/my-survey-by-date?organisationId=${orgId}`,
      providesTags: ['OrgSubmittedSurveys'],
    }),
    getSurveysDetailsByDate: builder.query({
      query: (data: any) =>
        `/organisation/survey-by-date?organizationId=${data.orgId}&date=${data.date}`,
      providesTags: ['OrgSubmittedSurveys'],
    }),
    submitOrgTransportSurvey: builder.mutation({
      query: data => ({
        url: `/organisation/monthlySurvey/transport`,
        method: 'POST',
        body: data,
      }),
    }),
    submitOrgMachineSurvey: builder.mutation({
      query: data => ({
        url: `/organisation/monthlySurvey/machinery`,
        method: 'POST',
        body: data,
      }),
    }),
    submitOrgElectricitySurvey: builder.mutation({
      query: data => ({
        url: `/organisation/monthlySurvey/electricity`,
        method: 'POST',
        body: data,
      }),
    }),
    submitOrgUtilitySurvey: builder.mutation({
      query: data => ({
        url: `/organisation/monthlySurvey/officeUtility`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSubmittedSurveysQuery,
  useGetSurveysDetailsByDateQuery,
  useSubmitOrgTransportSurveyMutation,
  useSubmitOrgMachineSurveyMutation,
  useSubmitOrgElectricitySurveyMutation,
  useSubmitOrgUtilitySurveyMutation,
} = orgnaisationEndpoint;
