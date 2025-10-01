// import axios from "axios";
import request from "../request/requst";

const baseUrl = process.env.VUE_APP_BASE_URL;

const getPage = (data) => {
  return request
    .get(baseUrl + "/code/getPage", {
      params: {
        current: data.current,
        size: data.size,
      },
    })
    .then((resp) => {
      return resp;
    });
};

export const dailyExpenseService = {
  getPage,
};
