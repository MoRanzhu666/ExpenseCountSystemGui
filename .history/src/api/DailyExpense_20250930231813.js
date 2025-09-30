import axios from "axios";

const baseUrl = process.env.VUE_APP_BASE_URL;
/**
 * axios响应：resp.data 中存储的才是实际响应
 */
const getPage = (data) => {
  return axios
    .get(baseUrl + "/dailyExpenses/getPage", {
      params: {
        current: data.current,
        size: data.size,
      },
    })
    .then((resp) => {
      return resp;
    });
};

const add = (data) => {
  return axios.post(baseUrl + "/dailyExpenses/add", data).then((resp) => {
    return resp;
  });
};

const update = (data) => {
  return axios.put(baseUrl + "/dailyExpenses/update", data).then((resp) => {
    return resp;
  });
};

const deleteById = (data)=>{
  return axios.delete(baseUrl + "/dailyExpenses/deleteById", {
    params: {
      id: data.id,
    },
  }).then((resp) => {
    return resp;
  });
}

export const dailyExpenseService = {
  getPage,
  add,
  update,
  deleteById
};
