// import axios from "axios";
import request from "../request/requst";

const baseUrl = process.env.VUE_APP_BASE_URL;
/**
 * axios响应：resp.data 中存储的才是实际响应
 */
const getPage = (data) => {
  return request
    .get(
      baseUrl + "/dailyExpenses/getPage",
      {
        params: {
          current: data.current,
          size: data.size,
        },
      }
    )
    .then((resp) => {
      return resp;
    });
};

const add = (data) => {
  return request.post(baseUrl + "/dailyExpenses/add", data).then((resp) => {
    return resp;
  });
};

const update = (data) => {
  return request.put(baseUrl + "/dailyExpenses/update", data).then((resp) => {
    return resp;
  });
};

const deleteById = (data) => {
  return request
    .delete(baseUrl + "/dailyExpenses/deleteById", {
      params: {
        id: data.id,
      },
    })
    .then((resp) => {
      return resp;
    });
};

const deleteByIds = (data) => {
  return request
    .delete(baseUrl + "/dailyExpenses/deleteByIds", {
      params: {
        ids: data.ids,
      },
    })
    .then((resp) => {
      return resp;
    });
};

export const dailyExpenseService = {
  getPage,
  add,
  update,
  deleteById,
  deleteByIds,
};
