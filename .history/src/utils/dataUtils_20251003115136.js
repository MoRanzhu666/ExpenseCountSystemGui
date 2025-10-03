import { ElMessage } from "element-plus";

/**
 * 处理响应数据
 * @param {表格数据实体} entity 
 * @param {响应体} resp 
 * @param {处理数据方式} pm 
 */
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

/**
 * 处理页面显示的分页参数
 * @param {分页实体} pageEntity 
 * @param {响应体} resp 
 */
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
 * 1：普通数据
 * 2：分页数据
 * 3：原始数据
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

/**
 * 格式化日期
 * @param {年} year 
 * @param {月} month 
 * @param {日} day 
 * @returns 由"YYYY-MM-DD"格式组成的日期字符串
 */
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
