import axios from "axios";

export const execWithoutHeaders = async (func) => {
  const allHeaders = { ...axios.defaults.headers.common };
  let res = null;
  if (allHeaders["Accept"]) {
    axios.defaults.headers.common = { Accept: allHeaders["Accept"] };
  } else {
    axios.defaults.headers.common = {};
  }
  try {
    res = await func();
  } catch (error) {
    console.log(error);
  }
  axios.defaults.headers.common = allHeaders;
  return res;
};
