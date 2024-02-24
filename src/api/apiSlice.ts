import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {logoutAction, setCredentialsAction} from './auth/authSlice';
import {BASE_URL} from '../constants/index';
import {getAsyncData} from '../utilities/asyncStorage';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',

  prepareHeaders: async (headers, {getState}: any) => {
    const userData = await getAsyncData('user');
    // const token = getState().auth.accessToken;

    const token = JSON.parse(userData ? userData : '{}').token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    let result = await baseQuery(args, api, extraOptions);
    console.log(result);
    if (result?.error?.status === 403) {
      console.log('sending refresh token');
      // send refresh token to get new access token
      const refreshResult = await baseQuery('/refresh', api, extraOptions);

      if (refreshResult?.data) {
        const user = api.getState().auth.user;
        // store the new token
        api.dispatch(setCredentialsAction({...refreshResult.data, user}));
        // retry the original query with new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logoutAction({}));
      }
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'userApi',

  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({}),
  tagTypes: [
    'EmpTips',
    'Employees',
    'Notifications',
    'EmpDashboard',
    'OrgDashboard',
    'OrgSubmittedSurveys',
    'EmpProfile',
    'OrgProfile',
    'OrgVehicles',
    'OrgMachines',
    'Countries',
    'States',
    'OrgOffsets',
    'OrgVouchers',
  ],
});
