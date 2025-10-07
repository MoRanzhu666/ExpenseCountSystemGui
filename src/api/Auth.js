import request from "@/utils/requst";

const baseUrl = process.env.VUE_APP_BASE_URL;
/**
 * axios响应：resp.data 中存储的才是实际响应
 */
const login = (data) => {
  return request
    .post(baseUrl + "/auth/login", {
      name: data.username,
      password: data.password,
    })
    .then((resp) => {
      return resp;
    });
};

const verify = (data) => {
  return request
    .get(baseUrl + "/auth/verify", {
      params: {
        token: data,
      },
    })
    .then((resp) => {
      return resp;
    });
};

export const authService = {
  login,
  verify,
};
