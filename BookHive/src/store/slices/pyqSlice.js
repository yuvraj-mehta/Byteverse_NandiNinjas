import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/apiConfig.js";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage.js";

const pyqSlice = createSlice({
  name: "pyq",
  // initialState: { pyqs: [], loading: false, error: null },
  initialState: {
    pyqs: [], // Initialize pyqs as an empty array
    loading: false,
    error: null,
  },
  reducers: {
    fetchPYQsRequest(state) {
      state.loading = true;
    },
    fetchPYQsSuccess(state, action) {
      state.loading = false;
      state.pyqs = action.payload;
    },
    fetchPYQsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addPYQRequest(state) {
      state.loading = true;
    },
    addPYQSuccess(state) {
      state.loading = false;
    },
    addPYQFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const fetchAllPYQs = () => async (dispatch) => {
  dispatch(pyqSlice.actions.fetchPYQsRequest());
  try {
    const { data } = await axios.get(API_ENDPOINTS.PYQ.GET_ALL, {
      withCredentials: true,
    });
    dispatch(pyqSlice.actions.fetchPYQsSuccess(data.pyqs));
  } catch (error) {
    dispatch(pyqSlice.actions.fetchPYQsFailed(getApiErrorMessage(error)));
  }
};

export const addPYQ = (pyqData) => async (dispatch) => {
  dispatch(pyqSlice.actions.addPYQRequest());
  try {
    const { data } = await axios.post(
      API_ENDPOINTS.PYQ.ADD,
      pyqData,
      { withCredentials: true }
    );
    dispatch(pyqSlice.actions.addPYQSuccess(data));
  } catch (error) {
    // Log the error for debugging
    console.error("Error adding PYQ:", error.response || error.message);
    dispatch(pyqSlice.actions.addPYQFailed(getApiErrorMessage(error)));
  }
};

export default pyqSlice.reducer;
