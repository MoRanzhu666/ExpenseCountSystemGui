import axios from "axios";
import { authService } from "./Auth";

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

const getUser = async ()=>{
  return await authService.verify(localStorage.getItem('token'))
}

export const userService = {
  getById,
  getUser,
};
