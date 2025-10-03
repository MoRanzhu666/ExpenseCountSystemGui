import { ElMessage } from "element-plus";

const processRespData = (entity, resp, pm) => {
  if (isSuscessResp(resp) && pm == 1) {
    entity.value = resp.data;
  } else if (isSuscessResp(resp) && pm == 2) {
    entity.value = resp.data.records;
  } else {
    entity.value = resp;
  }

  handleRespMessage(resp);
};
const processRespPageParams = (pageEntity, resp) => {
  pageEntity.value.total = resp.data.total;
  pageEntity.value.page = resp.data.page;
};

/**
 * 
 * @param {响应体} resp 
 * @returns 是否成功
 */
const isSuscessResp = (resp) => {
  if (resp && resp.code === 200) {
    return true;
  }
  return false;
};

/**
 * 处理响应数据的方式
 */
const processMap = {
  NORMAL: 1,
  PAGE: 2,
  RAW: 3,
};


/**
 * 
 * @param {响应体} resp 
 * @returns  是否成功
 */
const handleRespMessage = (resp) => {
  console.log("resp", resp, resp.code === 200);
  if (resp && resp.code === 200) {
    if (resp.message) ElMessage.success(resp.message);
    return true;
  } else {
    ElMessage.error(resp.message);
    return false;
  }
};

const formatDate = (year, month, day) => {
  const m = month < 10 ? `0${month}` : month;
  const d = day < 10 ? `0${day}` : day;
  return `${year}-${m}-${d}`;
};

export const dataUtils = {
  processRespData,
  processRespPageParams,
  processMap,
  handleRespMessage,
  formatDate,
};
