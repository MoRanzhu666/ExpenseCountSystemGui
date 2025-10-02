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
  });
};

const update = (data) => {
  return request.put(baseUrl + "/system/c_code/add", data).then((resp) => {
    return resp;
  });
};

const deleteByIds = (data)=>{
  return request.delete(baseUrl + "/system/c_code/delete", data).then((resp)=>{
    return resp;
  });
}

const categorySelector = (data)=>{
  return request.get(baseUrl + "/system/c_code/categorySelector", {
    params: {
      category: data.category,
    },
  }).then((resp)=>{
    return resp;
  });
}

export const ccodeService = {
  getPage,
  add,
  update,
  deleteByIds
};
