import useSWR from 'swr';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

export default function useRequest(request, { fallbackData, ...config } = {}) {
  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR(request && JSON.stringify(request), () => axios.request(request), {
    ...config,
    fallbackData: fallbackData && {
      status: 200,
      statusText: 'InitialData',

      config: request,
      headers: {},
      data: fallbackData,
    },
  });

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    mutate,
  };
}
