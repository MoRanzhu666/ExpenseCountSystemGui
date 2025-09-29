const processRespData = (entity, resp, pm) => {
  if (isSuscessResp(resp) && pm == 1) {
    console.log('normal', resp)
    entity.value = resp.data.data;
  } else if (isSuscessResp(resp) && pm == 2) {
    console.log('page', resp)
    entity.value = resp.data.data.records;
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

export const dataUtils = {
  processRespData,
  processMap,
};
