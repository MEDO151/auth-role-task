import {
  createApi,
} from "@reduxjs/toolkit/query/react";

import { baseQueryWithRefresh }
  from "@/lib/baseQuery";

import type {
  LoginPayload,
  LoginResponse,
  MeResponse,
} from "../../types/auth";

export const authApi =
  createApi({
    reducerPath:"authApi",baseQuery:baseQueryWithRefresh,tagTypes:["CurrentUser",], 

    endpoints: (builder) => ({
      login:builder.mutation<LoginResponse,LoginPayload>({
          query: (body) => ({url:"/api/auth/login",method:"POST",body,}),invalidatesTags: ["CurrentUser",],}),

      getCurrentUser:builder.query<MeResponse,void>({
          query:() => ({url:"/api/auth/me",method:"GET"}),providesTags:["CurrentUser",],}),
    }),
  });

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
} = authApi;