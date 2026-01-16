// API configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const API_ENDPOINTS = {
  TOKEN: `${API_URL}/api/token/`,
  TOKEN_REFRESH: `${API_URL}/api/token/refresh/`,
  REGISTER: `${API_URL}/api/register/`,
  PASSWORD_RESET: `${API_URL}/api/password-reset/`,
  PASSWORD_RESET_CONFIRM: `${API_URL}/api/password-reset-confirm/`,
  LEADS: `${API_URL}/api/leads/`,
};
