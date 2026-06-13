import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/lib/cookies";

import { handleApiError } from "@/lib/handle-api-error";

import { getLocale } from "@/lib/utils";

const rawBaseQuery = fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_API_URL,prepareHeaders: (headers,) => {
      const token = getAccessToken();

      if (token) {
        headers.set("Authorization",`Bearer ${token}`,);
      }

      return headers;
    },
  });

export const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs,unknown,FetchBaseQueryError> = async (args,api,extraOptions,) => {
  let result =await rawBaseQuery(args,api,extraOptions);

  const isAuthRequest = typeof args !== "string" && args.url?.includes("/auth/login",);

  if (result.error?.status === 401 &&getAccessToken() &&!isAuthRequest) {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearTokens();

      const locale = getLocale();
      window.location.href =`/${locale}/login`;

      return result;
    }

    const refreshResult = await rawBaseQuery({url:"/api/auth/refresh",method:"POST",body: {refreshToken}},api,extraOptions,);

    if (refreshResult.data) {
      const response =
        refreshResult.data as {
          data: {
            accessToken: string;
            refreshToken: string;
          };
        };
      setTokens({
        accessToken:response.data.accessToken,
        refreshToken:response.data.refreshToken,
      });
      result = await rawBaseQuery(args,api,extraOptions);
    } else {
      clearTokens();
      const locale = getLocale();
      window.location.href =`/${locale}/login`;
    }
  }

  if (result.error) {
    handleApiError(result.error);
  }

  return result;
};