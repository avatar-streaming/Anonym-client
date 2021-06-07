export const getPayload = async (url, option) => {
  const response = await fetch(url, option);
  const { payload } = await response.json();

  return { response, payload };
};
