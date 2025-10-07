import request from "@/utils/requst";

const baseUrl = process.env.VUE_APP_BASE_URL;
/**
 * axios响应：resp.data 中存储的才是实际响应
 */
const login = (data) => {
  return request.post(baseUrl + "/auth/getById", data).then((resp) => {
    return resp;
  });
};

export const authService = {
  login,
};
