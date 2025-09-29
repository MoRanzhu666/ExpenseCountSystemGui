import axios from "axios";

const baseUrl = process.env.BASE_URL;

const getPage = (data) => {
    console.log('baseurl', process.env.NODE_ENV)
  return axios
    .post(baseUrl + "/dailyExpenses/getPage?current=1&size=50", data)
    .then((resp) => {
      return resp;
    });
};

export const dailyExpenseService = {
  getPage,
};
