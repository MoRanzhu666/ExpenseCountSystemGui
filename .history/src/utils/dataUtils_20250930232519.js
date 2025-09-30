import { ElMessage } from "element-plus";

const processRespData = (entity, resp, pm) => {
  if (isSuscessResp(resp) && pm == 1) {
    entity.value = resp.data.data;
  } else if (isSuscessResp(resp) && pm == 2) {
    entity.value = resp.data.data.records;
  } else {
    entity.value = resp;
  }

  handleRespMessage(resp)
};
const processRespPageParams = (pageEntity, resp)=>{
    pageEntity.value.total = resp.data.data.total
    pageEntity.value.page = resp.data.data.page
}

const isSuscessResp = (resp) => {
  if (resp && resp.data.code === 200) {
    return true;
  }
  return false;
};
const processMap = {
  NORMAL: 1,
  PAGE: 2,
  RAW: 3,
};

const handleRespMessage = (resp)=>{
  if(resp && resp.code===200){
    ElMessage.success(resp.message)
  }else{
    ElMessage.error(resp.message)
  }
}

export const dataUtils = {
  processRespData,
  processRespPageParams,
  processMap,
  handleRespMessage
};
