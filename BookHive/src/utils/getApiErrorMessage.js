export const getApiErrorMessage = (
  error,
  fallback = "Something went wrong. Please try again."
) => error?.response?.data?.message || error?.message || fallback;
