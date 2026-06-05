import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/apiConfig.js";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    message: null,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    otpVerificationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    otpVerificationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    otpVerificationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    getUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    getUserFailed(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },

    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updatePasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetAuthSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
  },
});

export const resetAuthSlice = () => (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};

export const register = (data) => async (dispatch) => {
  dispatch(authSlice.actions.registerRequest());
  await axios
    .post(API_ENDPOINTS.AUTH.REGISTER, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.registerSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.registerFailed(getApiErrorMessage(error)));
    });
};

export const otpVerification = (email, otp) => async (dispatch) => {
  dispatch(authSlice.actions.otpVerificationRequest());
  await axios
    .post(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      { email, otp },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(authSlice.actions.otpVerificationSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.otpVerificationFailed(getApiErrorMessage(error))
      );
    });
};

export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  await axios
    .post(API_ENDPOINTS.AUTH.LOGIN, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.loginSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.loginFailed(getApiErrorMessage(error)));
    });
};

export const logout = () => async (dispatch) => {
  dispatch(authSlice.actions.logoutRequest());
  await axios
    .get(API_ENDPOINTS.AUTH.LOGOUT, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(authSlice.actions.logoutSuccess(res.data.message));
      dispatch(authSlice.actions.resetAuthSlice());
    })
    .catch((error) => {
      dispatch(authSlice.actions.logoutFailed(getApiErrorMessage(error)));
    });
};

export const getUser = () => async (dispatch) => {
  dispatch(authSlice.actions.getUserRequest());
  await axios
    .get(API_ENDPOINTS.AUTH.GET_ME, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(authSlice.actions.getUserSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.getUserFailed(getApiErrorMessage(error)));
    });
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());
  await axios
    .post(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(authSlice.actions.forgotPasswordSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.forgotPasswordFailed(getApiErrorMessage(error))
      );
    });
};

export const resetPassword = (data, token) => async (dispatch) => {
  dispatch(authSlice.actions.resetPasswordRequest());
  await axios
    .put(API_ENDPOINTS.AUTH.RESET_PASSWORD(token), data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.resetPasswordSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.resetPasswordFailed(getApiErrorMessage(error))
      );
    });
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  await axios
    .put(API_ENDPOINTS.AUTH.UPDATE_PASSWORD, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.updatePasswordSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.updatePasswordFailed(getApiErrorMessage(error))
      );
    });
};

export default authSlice.reducer;
