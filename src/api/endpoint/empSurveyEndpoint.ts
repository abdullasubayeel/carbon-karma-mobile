import {
  EmpSurveyByDatePayload,
  EmpSurveyDataResponse,
  EmployeeSurveysResponse,
} from '../../enums/employee';
import {apiSlice} from '../apiSlice';

const empSurveyEndpoints = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSubmittedEmpSurveys: builder.query<EmployeeSurveysResponse, string>({
      query: id => `/auth/employee/survey/submitted?employeeId=${id}`,
      providesTags: ['EmpSubmittedSurveys'],
    }),
    getSurveysDetailsByDate: builder.query<
      EmpSurveyDataResponse,
      EmpSurveyByDatePayload
    >({
      query: (data: any) =>
        `/auth/employee/emission-history?employeeId=${data.empId}&date=${data.date}`,
      providesTags: ['OrgSubmittedSurveys'],
    }),
  }),
});

export const {useGetSubmittedEmpSurveysQuery, useGetSurveysDetailsByDateQuery} =
  empSurveyEndpoints;
