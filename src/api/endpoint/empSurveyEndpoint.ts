import {
  ElectricDataPayload,
  EmpSurveyByDatePayload,
  EmpSurveyDataResponse,
  EmpVehicleResponse,
  EmployeeSurveysResponse,
  HousholdDataType,
  TripDataPayload,
} from '../../enums/employee';
import {apiSlice} from '../apiSlice';

const empSurveyEndpoints = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSubmittedEmpSurveys: builder.query<EmployeeSurveysResponse, string>({
      query: id => `/auth/employee/survey/submitted?employeeId=${id}`,
      providesTags: ['EmpSubmittedSurveys'],
    }),
    getEmpVehicles: builder.query<EmpVehicleResponse, undefined>({
      query: id => `/super/vehicles`,
      providesTags: ['EmpVehicles'],
    }),
    getSurveysDetailsByDate: builder.query<
      EmpSurveyDataResponse,
      EmpSurveyByDatePayload
    >({
      query: (data: any) =>
        `/auth/employee/emission-history?employeeId=${data.empId}&date=${data.date}`,
      providesTags: ['OrgSubmittedSurveys'],
    }),
    submitEmpTransportSurvey: builder.mutation<
      {emission: number},
      TripDataPayload
    >({
      query: data => ({
        url: `/auth/employee/trip-emission`,
        method: 'POST',
        body: data,
      }),
    }),
    submitEmpElectricitySurvey: builder.mutation<
      {carbonEmissions: string},
      ElectricDataPayload
    >({
      query: data => ({
        url: `/auth/employee/electricity-emission`,
        method: 'POST',
        body: data,
      }),
    }),
    submitEmpHousholdSurvey: builder.mutation<
      {carbonEmissions: string},
      HousholdDataType
    >({
      query: data => ({
        url: `/auth/employee/household-emission`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSubmittedEmpSurveysQuery,
  useGetEmpVehiclesQuery,
  useGetSurveysDetailsByDateQuery,
  useSubmitEmpElectricitySurveyMutation,
  useSubmitEmpHousholdSurveyMutation,
  useSubmitEmpTransportSurveyMutation,
} = empSurveyEndpoints;
