import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    token: '',
  },
  reducers: {
    loginAction: (state, action) => {
      const {email, token} = action.payload;
      state.email = email;
      state.token = token;
    },
    setCredentialsAction: (state, action) => {
      const {email, token} = action.payload;
      state.email = email;
      state.token = token;
    },
    logoutAction: (state, action) => {
      state.email = '';
      state.token = '';
    },
  },
});

export const {loginAction, logoutAction, setCredentialsAction} =
  authSlice.actions;

export default authSlice.reducer;
