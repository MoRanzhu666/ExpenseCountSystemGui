const processRespData = (entity, resp, pm) => {
  if (isSuscessResp(resp) && pm === 1) {
    entity.value = resp.data;
  } else if (isSuscessResp(resp) && pm === 2) {
    entity.value = resp.data.records;
  } else {
    entity.value = resp;
  }
};
const isSuscessResp = (resp) => {
  if (resp && resp.code === 200) {
    return true;
  }
  return false;
};
const processMap = {
  NORMAL: 1,
  PAGE: 2,
  RAW: 3,
};

export const DataUtils = {
  processRespData,
  processMap,
};
