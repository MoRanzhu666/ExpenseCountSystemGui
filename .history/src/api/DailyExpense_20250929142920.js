import axios from "axios";

const baseUrl = process.env.VUE_APP_BASE_URL;

const getPage = (data) => {
  return axios
    .post(baseUrl + "/dailyExpenses/getPage?current=1&size=50", data)
    .then((resp) => {
      return resp;
    });
};

export const dailyExpenseService = {
  getPage,
};
