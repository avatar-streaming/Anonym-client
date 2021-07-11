/**
 *
 * @param {string} path path for fetch
 * @returns full url for fetch
 */
export const urlHelper = (path = "") => {
  return `${process.env.REACT_APP_USER_SERVER}/${path}`;
};

/**
 *
 * @param {string} method router method
 * @returns default option object for fetch
 */
export const defaultOptionHelper = (method) => ({
  method,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});
