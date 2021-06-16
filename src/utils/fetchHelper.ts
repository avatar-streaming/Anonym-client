export const urlHelper = (value = "") => {
  return `${process.env.REACT_APP_USER_SERVER}/${value}`;
};

export interface optionHelper {
  method: string;
  credentials: string;
  headers: object;
  body: null | string;
}

export const defaultOptionHelper = (method: string): optionHelper => ({
  method,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: null,
});
