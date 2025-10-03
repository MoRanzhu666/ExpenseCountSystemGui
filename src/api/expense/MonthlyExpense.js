import request from "@/request/requst";

// import axios from "axios";

const baseUrl = process.env.VUE_APP_BASE_URL+"/expense/monthlyExpense";
/**
 * axios响应：resp.data 中存储的才是实际响应
 */
const getPage = (data) => {
  return request
    .get(baseUrl + "/getPage", {
      params: {
        current: data.current,
        size: data.size,
        key:data.key
      },
    })
    .then((resp) => {
      return resp;
    });
};


export const monthlyExpenseServiece = {
  getPage,
};
