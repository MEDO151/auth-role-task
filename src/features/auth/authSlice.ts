import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import type {
  AuthState,
  LoginData,
} from './types';

const initialState:
  AuthState = {
  accessToken:
    null,

  refreshToken:
    null,

  user: null,
};

const authSlice =
  createSlice({
    name: 'auth',

    initialState,

    reducers: {
      setCredentials: (
        state,
        action:
          PayloadAction<LoginData>
      ) => {
        state.accessToken =
          action.payload
            .accessToken;

        state.refreshToken =
          action.payload
            .refreshToken;

        state.user =
          action.payload
            .user;
      },

      logout: (
        state
      ) => {
        state.accessToken =
          null;

        state.refreshToken =
          null;

        state.user =
          null;
      },
    },
  });

export const {
  setCredentials,
  logout,
} = authSlice.actions;

export default
  authSlice.reducer;