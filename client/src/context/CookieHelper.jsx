import { useCookieContext } from '../context/CookieContext';

export const getCookie = (name) => {
  const { cookies } = useCookieContext();
  return cookies[name];
};