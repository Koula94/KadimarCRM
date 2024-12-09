import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  roles: string[];
  exp: number;
}

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};