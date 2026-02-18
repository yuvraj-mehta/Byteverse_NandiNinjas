import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleRecordBookPopup } from "./popUpSlice";

const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    loading: false,
    error: null,
    userBorrowedBooks: [],
    allBorrowedBooks: [],
    message: null,
  },
  reducers: {
    fetchUserBorrowedBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchUserBorrowedBooksSuccess(state, action) {
      state.loading = false;
      state.userBorrowedBooks = action.payload;
    },
    fetchUserBorrowedBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    recordBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    recordBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    recordBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    fetchAllBorrowedBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchAllBorrowedBooksSuccess(state, action) {
      state.loading = false;
      state.allBorrowedBooks = action.payload;
    },
    fetchAllBorrowedBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    returnBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    returnBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    returnBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetBorrowSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const fetchUserBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.fetchUserBorrowedBooksRequest());
  await axios
    .get("http://localhost:3500/api/v1/borrow/my-borrowed-books", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(
        borrowSlice.actions.fetchUserBorrowedBooksSuccess(
          res.data.borrowedBooks
        )
      );
    })
    .catch((err) => {
      dispatch(
        borrowSlice.actions.fetchUserBorrowedBooksFailed(
          err.response.data.message
        )
      );
    });
};

export const fetchAllBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest());
  await axios
    .get("http://localhost:3500/api/v1/borrow/borrowed-books-by-users", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(
        borrowSlice.actions.fetchAllBorrowedBooksSuccess(res.data.borrowedBooks)
      );
    })
    .catch((err) => {
      dispatch(
        borrowSlice.actions.fetchAllBorrowedBooksFailed(
          err.response.data.message
        )
      );
    });
};

export const recordBorrowBook = (email, id) => async (dispatch) => {
  dispatch(borrowSlice.actions.recordBookRequest());
  await axios
    .post(
      `http://localhost:3500/api/v1/borrow/record-borrow-book/${id}`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(borrowSlice.actions.recordBookSuccess(res.data.message));
      dispatch(toggleRecordBookPopup());
    })
    .catch((err) => {
      dispatch(borrowSlice.actions.recordBookFailed(err.response.data.message));
    });
};

export const returnBook = (email, id) => async (dispatch) => {
  dispatch(borrowSlice.actions.returnBookRequest());
  await axios
    .put(
      `http://localhost:3500/api/v1/borrow/return-borrowed-book/${id}`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(borrowSlice.actions.returnBookSuccess(res.data.message));
    })
    .catch((err) => {
      dispatch(borrowSlice.actions.returnBookFailed(err.response.data.message));
    });
};

export const resetBorrowSlice = () => (dispatch) => {
  dispatch(borrowSlice.actions.resetBorrowSlice());
};

export default borrowSlice.reducer;
