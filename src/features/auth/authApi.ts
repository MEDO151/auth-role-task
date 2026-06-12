import {
  createApi,
} from '@reduxjs/toolkit/query/react';

import { baseQuery }
  from '@/lib/baseQuery';

import type {
  LoginPayload,
  LoginResponse,
  MeResponse,
} from './types';

export const authApi =
  createApi({
    reducerPath:
      'authApi',

    baseQuery,

    endpoints: (
      builder
    ) => ({
      login:
        builder.mutation<
          LoginResponse,
          LoginPayload
        >({
          query: (
            body
          ) => ({
            url:
              '/api/auth/login',

            method:
              'POST',

            body,
          }),
        }),

      getCurrentUser:
        builder.query<
          MeResponse,
          void
        >({
          query: () => ({
            url:
              '/api/auth/me',

            method:
              'GET',
          }),
        }),
    }),
  });

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
} = authApi;