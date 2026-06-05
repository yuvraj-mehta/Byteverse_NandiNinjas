import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleAddBookPopup } from "./popUpSlice";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../config/apiConfig.js";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage.js";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    error: null,
    message: null,
    books: [],
  },
  reducers: {
    fetchBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchBooksSuccess(state, action) {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    addBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetBookSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
  },
});

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  await axios
    .get(API_ENDPOINTS.BOOK.GET_ALL, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
    })
    .catch((err) => {
      dispatch(bookSlice.actions.fetchBooksFailed(getApiErrorMessage(err)));
    });
};

export const addBook = (data) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());
  await axios
    .post(API_ENDPOINTS.BOOK.ADD, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      bookSlice.actions.addBookSuccess(res.data.message);
      toast.success(res.data.message);
      dispatch(toggleAddBookPopup());
      dispatch(fetchAllBooks());
    })
    .catch((err) => {
      dispatch(bookSlice.actions.addBookFailed(getApiErrorMessage(err)));
    });
};

export const resetBookSlice = () => (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;
