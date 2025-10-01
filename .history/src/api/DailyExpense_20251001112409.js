import axios from "axios";
import request from "../request/requst";

const baseUrl = process.env.VUE_APP_BASE_URL;
/**
 * axios响应：resp.data 中存储的才是实际响应
 */
const getPage = (data) => {
  request

  return axios
    .get(baseUrl + "/dailyExpenses/getPage", {
      params: {
        current: data.current,
        size: data.size,
      },
    })
    .then((resp) => {
      return resp.data;
    });
};

const add = (data) => {
  return axios.post(baseUrl + "/dailyExpenses/add", data).then((resp) => {
    return resp.data;
  });
};

const update = (data) => {
  return axios.put(baseUrl + "/dailyExpenses/update", data).then((resp) => {
    return resp.data;
  });
};

const deleteById = (data)=>{
  return axios.delete(baseUrl + "/dailyExpenses/deleteById", {
    params: {
      id: data.id,
    },
  }).then((resp) => {
    return resp.data;
  });
}

const deleteByIds = (data)=>{
  return axios.delete(baseUrl + "/dailyExpenses/deleteByIds", {
    params: {
      ids: data.ids,
    },
  }).then((resp) => {
    return resp.data;
  });
}

export const dailyExpenseService = {
  getPage,
  add,
  update,
  deleteById,
  deleteByIds
};
