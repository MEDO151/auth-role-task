import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { showErrorToast } from "./toast";

export function
handleApiError(error: | FetchBaseQueryError | any) {
  if (!error) {
    showErrorToast();
    return;
  }

  const status = error?.status;

  const message = error?.data?.message;

  switch (status) {
    case 400:
      showErrorToast(message || "Bad request");
      break;

    case 401:
      showErrorToast(message || "Incorrect email or password");
      break;

    case 403:
      showErrorToast(message || "Forbidden");
      break;

    case 404:
      showErrorToast(message || "Not found");
      break;

    case 500:
      showErrorToast(message || "Server error");
      break;

    default:
      showErrorToast(message || "Something went wrong");
  }
}