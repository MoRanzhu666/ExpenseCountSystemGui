import axios from "axios";

const baseUrl = process.env.VUE_APP_BASE_URL;
/**
 * axios响应：resp.data 中存储的才是实际响应
 */
const getById = (data) => {
  return axios
    .get(baseUrl + "/user/getById", {
      params: {
        id: data.id,
      },
    })
    .then((resp) => {
      return resp;
    });
};

export const userService = {
  getById,
};
