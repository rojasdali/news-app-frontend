import axios from "axios";
import { useState, useCallback } from "react";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const getService = async (url, params) => {
  try {
    const res = await axiosInstance.get(url, { params });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const useApi = (method, url) => {
  const [res, setRes] = useState({
    loading: true,
    result: {},
    error: undefined,
  });

  const serviceMethod = {
    GET: getService,
  }[method];

  const requestData = useCallback(
    async (reqData) => {
      setRes((prevState) => ({ ...prevState, loading: true }));

      try {
        const endpoint = reqData && reqData.id ? `${url}/${reqData.id}` : url;
        const data = reqData && reqData.data ? reqData.data : null;

        const resData = await serviceMethod(endpoint, data);

        setRes((prevState) => ({
          ...prevState,
          loading: false,
          result: resData,
        }));
      } catch (error) {
        setRes((prevState) => ({ ...prevState, loading: false, error: error }));
      }
    },
    [serviceMethod, url]
  );

  return [res, requestData];
};
