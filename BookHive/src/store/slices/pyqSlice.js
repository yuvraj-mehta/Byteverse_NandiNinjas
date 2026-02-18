import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const pyqSlice = createSlice({
  name: "pyq",
  // initialState: { pyqs: [], loading: false, error: null },
  initialState: {
    pyqs: [], // Initialize pyqs as an empty array
    loading: false,
    error: null,
  },
  reducers: {
    fetchPYQsRequest(state) { state.loading = true; },
    fetchPYQsSuccess(state, action) { state.loading = false; state.pyqs = action.payload; },
    fetchPYQsFailed(state, action) { state.loading = false; state.error = action.payload; },
    addPYQRequest(state) { state.loading = true; },
    addPYQSuccess(state, action) { state.loading = false; },
    addPYQFailed(state, action) { state.loading = false; state.error = action.payload; },
  },
});

export const fetchAllPYQs = () => async (dispatch) => {
  dispatch(pyqSlice.actions.fetchPYQsRequest());
  try {
    const { data } = await axios.get("http://localhost:3500api/v1/pyq/all", { withCredentials: true });
    dispatch(pyqSlice.actions.fetchPYQsSuccess(data.pyqs));
  } catch (error) {
    dispatch(pyqSlice.actions.fetchPYQsFailed(error.response.data.message));
  }
};

// export const addPYQ = (pyqData) => async (dispatch) => {
//   dispatch(pyqSlice.actions.addPYQRequest());
//   try {
//     await axios.post("http://localhost:3500api/v1/pyq/admin/add", pyqData, { withCredentials: true });
//     dispatch(pyqSlice.actions.addPYQSuccess());
//   } catch (error) {
//     dispatch(pyqSlice.actions.addPYQFailed(error.response.data.message));
//   }
// };


export const addPYQ = (pyqData) => async (dispatch) => {
  dispatch(pyqSlice.actions.addPYQRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:3500/api/v1/pyq/admin/add",
      pyqData,
      { withCredentials: true }
    );
    dispatch(pyqSlice.actions.addPYQSuccess(data));
  } catch (error) {
    // Log the error for debugging
    console.error("Error adding PYQ:", error.response || error.message);
    dispatch(pyqSlice.actions.addPYQFailed(error.response?.data?.message || "An error occurred"));
  }
};

export default pyqSlice.reducer;