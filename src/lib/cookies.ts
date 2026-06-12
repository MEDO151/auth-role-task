import Cookies from "js-cookie";

export const getAccessToken = () => Cookies.get("accessToken");

export const getRefreshToken = () => Cookies.get("refreshToken",);

export const setTokens = ({accessToken,refreshToken,}: {
  accessToken: string;
  refreshToken: string;
}) => {
  Cookies.set("accessToken",accessToken,);
  Cookies.set("refreshToken",refreshToken,);
};

export const clearTokens = () => {
    Cookies.remove("accessToken",);
    Cookies.remove("refreshToken",
    );
  };