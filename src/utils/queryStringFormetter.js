export const queryParamFormatter = (payload) => {
  if (payload) {
    const data = Object.keys(payload).reduce((prev, current) => {
      return prev + `${current}=${payload[current]}` + "&";
    }, "");
    return data.slice(0, data.length - 1);
  }
};
