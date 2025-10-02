// import axios from "axios";
import request from "@/request/requst";

const baseUrl = process.env.VUE_APP_BASE_URL;

const getPage = (data) => {
  return request
    .get(baseUrl + "/system/c_code/getPage", {
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
  return request.post(baseUrl + "/system/c_code/add", data).then((resp) => {
    return resp;
  }
);
}

export const ccodeService = {
  getPage,
};
