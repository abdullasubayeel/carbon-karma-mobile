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

    createOrganisation: builder.mutation({
      query: data => ({
        url: `/organisation/auth/signup`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {useGetSubmittedSurveysQuery} = orgnaisationEndpoint;
