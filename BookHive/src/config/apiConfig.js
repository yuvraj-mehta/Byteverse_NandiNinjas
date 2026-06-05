/**
 * Centralized API configuration
 * Uses environment variables for the server URL
 */

const API_BASE_URL = (
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
    VERIFY_OTP: `${API_BASE_URL}/api/v1/auth/verify-otp`,
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/v1/auth/logout`,
    GET_ME: `${API_BASE_URL}/api/v1/auth/me`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/v1/auth/password/forgot`,
    RESET_PASSWORD: (token) => `${API_BASE_URL}/api/v1/auth/password/reset/${token}`,
    UPDATE_PASSWORD: `${API_BASE_URL}/api/v1/auth/password/update`,
  },

  // Book endpoints
  BOOK: {
    GET_ALL: `${API_BASE_URL}/api/v1/book/all`,
    ADD: `${API_BASE_URL}/api/v1/book/admin/add`,
  },

  // Borrow endpoints
  BORROW: {
    GET_MY_BORROWED: `${API_BASE_URL}/api/v1/borrow/my-borrowed-books`,
    GET_ALL_BORROWED: `${API_BASE_URL}/api/v1/borrow/borrowed-books-by-users`,
    RECORD_BORROW: (id) => `${API_BASE_URL}/api/v1/borrow/record-borrow-book/${id}`,
    RETURN_BOOK: (id) => `${API_BASE_URL}/api/v1/borrow/return-borrowed-book/${id}`,
  },

  // PYQ endpoints
  PYQ: {
    GET_ALL: `${API_BASE_URL}/api/v1/pyq/all`,
    ADD: `${API_BASE_URL}/api/v1/pyq/admin/add`,
  },

  // PDF endpoints
  PDF: {
    UPLOAD: `${API_BASE_URL}/api/v1/pdf/upload`,
  },

  // User endpoints
  USER: {
    GET_ALL: `${API_BASE_URL}/api/v1/user/all`,
    ADD_ADMIN: `${API_BASE_URL}/api/v1/user/add/new-admin`,
  },
};

export default API_BASE_URL;
