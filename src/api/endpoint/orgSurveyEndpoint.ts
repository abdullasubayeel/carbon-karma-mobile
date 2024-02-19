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

    createOrganisation: builder.mutation({
      query: data => ({
        url: `/organisation/auth/signup`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {useGetSubmittedSurveysQuery, useGetSurveysDetailsByDateQuery} =
  orgnaisationEndpoint;
