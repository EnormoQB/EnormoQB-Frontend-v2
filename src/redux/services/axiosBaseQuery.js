import ApiCaller from '../../utils/axios';

const axiosBaseQuery = async ({ url, method, data, params }) => {
  try {
    const result = await ApiCaller({
      url,
      method,
      data,
      params,
    });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export default axiosBaseQuery;
