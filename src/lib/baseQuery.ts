import {
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { getToken }
  from './cookies';

export const baseQuery =
  fetchBaseQuery({
    baseUrl:
      process.env
        .NEXT_PUBLIC_API_URL,

    prepareHeaders: (
      headers
    ) => {
      const token =
        getToken();

      if (token) {
        headers.set(
          'Authorization',
          `Bearer ${token}`
        );
      }

      return headers;
    },
  });