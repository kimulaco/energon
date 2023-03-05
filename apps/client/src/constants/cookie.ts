export const ID_COOKIE_KEY = 'enrgid';
export const TOKEN_COOKIE_KEY = 'enrgt';

export const SESSION_COOKIE_OPTION: Cookies.CookieAttributes = {
  expires: 1 / 48, // 30 minutes
  secure: true,
};
