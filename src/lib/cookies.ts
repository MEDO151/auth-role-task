import Cookies from 'js-cookie';

export const setTokens = (
  accessToken: string,
  refreshToken: string
) => {
  Cookies.set(
    'accessToken',
    accessToken,
    {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    }
  );

  Cookies.set(
    'refreshToken',
    refreshToken,
    {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    }
  );
};

export const getToken =
  () =>
    Cookies.get(
      'accessToken'
    );

export const clearTokens =
  () => {
    Cookies.remove(
      'accessToken'
    );

    Cookies.remove(
      'refreshToken'
    );
  };