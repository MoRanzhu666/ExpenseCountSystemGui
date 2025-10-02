<template>
  <common-tool-bar :buttonList="buttonList" />
  <common-table
    :table-data="tableData"
    :table-header-list="tableHeaderList"
    :page-params="pageParams"
    :handle-row-click="handleRowClick"
    :handle-selection-change="handleSelectionChange"
    @update:size="(val) => handleSizeChange(val)"
    @update:current="(val) => handleCurrentChange(val)"
  />
  <common-form
    :form-data="formData"
    :form-title="formTitle"
    :is-show="isShowForm"
    :handle-add="handleSubmit"
    @closeForm="closeForm"
  />
</template>

<script setup>
// import { userService } from "@/api/User";
import { dataUtils } from "@/utils/dataUtils";
import { onMounted, ref, watch } from "vue";
import CommonTable from "@/components/CommonTable.vue";
import CommonToolBar from "@/components/CommonToolBar.vue";
import CommonForm from "@/components/CommonForm.vue";
import { ccodeService } from "@/api/system/CCode";

// 通用表单
const formTitle = ref("系统代码编辑");
const formData = ref({
  // 分类字段
  category: {
    lable: "分类",
    value: "",
    type: "selection",
    align: "center",
    options: [
      {
        label: "角色分类",
        value: "ROLE",
        category: "CATEGORY",
      },
      {
        label: "消费分类",
        value: "EXPENSE",
        category: "CATEGORY",
      },
    ],
  },

  // 编码字段
  code: {
    lable: "编码",
    value: "",
    type: "text",
    align: "center",
  },
  // 描述字段
  describe: {
    lable: "描述",
    value: "",
    type: "text",
    align: "center",
  },
  // 创建人字段
  createByName: {
    lable: "创建人",
    value: "",
    type: "hidden",
    align: "center",
  },
  // 创建时间字段
  createTime: {
    lable: "创建时间",
    value: "",
    type: "hidden",
    align: "center",
  },
  // 更新人字段
  updateByName: {
    lable: "更新人",
    value: "",
    type: "hidden",
    align: "center",
  },
  // 更新时间字段
  updateTime: {
    lable: "更新时间",
    value: "",
    type: "hidden",
    align: "center",
  },
});
const categoryOptions = ref([]);
const getCategoryOptions = async () => {
  const resp = await ccodeService.categorySelector({ category: "ROLE" });
  dataUtils.processRespData(categoryOptions, resp, dataUtils.processMap.NORMAL);
  console.log("categoryOptions", categoryOptions.value);
};
const isShowForm = ref(false);
const handleFormData = (data) => {
  if (formTitle.value.includes("编辑")) {
    for (let i in formData.value) {
      formData.value[i].value = data[i];
    }
  }

  for(let i in formData.value.category.options) {
    formData.value.category.options[i] = {label: "", value: "", category: ""};
  }

  for (let i in categoryOptions.value) {
    console.log("i", i, categoryOptions.value[i]);
    formData.value.category.options[i].category =
      categoryOptions.value[i].category;
    formData.value.category.options[i].label =
      categoryOptions.value[i].describe;
    formData.value.category.options[i].value = categoryOptions.value[i].code;
  }

  console.log("formData", formData.value);
};
const closeForm = () => {
  isShowForm.value = false;
  resetFormData();
};
const resetFormData = () => {
  for (let i in formData.value) {
    formData.value[i].value = "";
  }
};
const handleSubmit = async (formData) => {
  if (formData.id) {
    const resp = await ccodeService.update(formData);
    if (dataUtils.handleRespMessage(resp)) {
      closeForm();
      initData();
    }
  } else {
    const resp = await ccodeService.add(formData);
    if (dataUtils.handleRespMessage(resp)) {
      closeForm();
      initData();
    }
  }

  // const resp =  dailyExpenseService.add(formData)
  // dataUtils.handleRespMessage(resp);
};

// 通用工具栏
const handlerAdd = () => {
  formTitle.value = "系统代码新增";
  resetFormData();
  handleFormData();
  isShowForm.value = true;
  
};
const handlerUpdate = () => {
  isShowForm.value = true;
  handleFormData(selectedRows.value[0]);
  formTitle.value = "系统代码编辑";
};
const handlerDelete = async () => {
  const ids = [];
  selectedRows.value.map((item) => ids.push(item.id));
  const resp = await ccodeService.deleteByIds({ ids: ids });
  if (dataUtils.handleRespMessage(resp)) {
    initData();
  }
};
const disableUpdate = () => {
  buttonList.value.update.disabled = true;
};
const startUpdate = () => {
  buttonList.value.update.disabled = false;
};
const disableDelete = () => {
  buttonList.value.delete.disabled = true;
};
const startDelete = () => {
  buttonList.value.delete.disabled = false;
};
const buttonList = ref({
  add: {
    name: "新增",
    title: "add",
    handler: handlerAdd,
    type: "primary",
    disabled: false,
    size: "default",
  },
  update: {
    name: "修改",
    title: "update",
    handler: handlerUpdate,
    type: "primary",
    disabled: true,
    size: "default",
  },
  delete: {
    name: "删除",
    title: "delete",
    handler: handlerDelete,
    type: "danger",
    disabled: true,
    size: "default",
  },
});

// 通用表格
const selectedRows = ref([]);
watch(
  () => selectedRows.value,
  (newVal) => {
    if (newVal.length != 1) {
      disableUpdate();
    } else {
      startUpdate();
    }
    if (newVal.length < 1) {
      disableDelete();
    } else {
      startDelete();
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
const handleRowClick = (row) => {
  selectedRows.value = [];
  selectedRows.value.push(row);
};
const handleSelectionChange = (rows) => {
  selectedRows.value = rows;
};
const tableData = ref([]);
const tableHeaderList = ref([
  {
    label: "序号",
    prop: "index",
    width: 80,
    align: "center",
    formatter: (row, column, cellValue, index) => {
      return index + 1;
    },
  },
  // {
  //   label: "ID",
  //   prop: "id",
  //   width: 120,
  //   align: "center",
  // },
  {
    label: "分类",
    prop: "category",
    align: "center",
  },
  {
    label: "编码",
    prop: "code",
    align: "center",
  },
  {
    label: "描述",
    prop: "describe",
    align: "center",
  },
  {
    label: "创建人",
    prop: "createByName",
    align: "center",
  },
  {
    label: "创建时间",
    prop: "createTime",
    align: "center",
  },
  {
    label: "更新人",
    prop: "updateByName",
    align: "center",
  },
  {
    label: "更新时间",
    prop: "updateTime",
    align: "center",
  },
]);
const pageParams = ref({
  current: 1,
  size: 20,
  total: 10,
  page: 10,
});
const getTableData = async () => {
  const resp = await ccodeService.getPage(pageParams.value);
  dataUtils.processRespData(tableData, resp, dataUtils.processMap.PAGE);
  dataUtils.processRespPageParams(pageParams, resp);
};
const handleSizeChange = (size) => {
  pageParams.value.size = size;
  getTableData();
};
const handleCurrentChange = (current) => {
  pageParams.value.current = current;
  getTableData();
};

// const getUserInfo = async (id) => {
//   const user = (await userService.getById({ id })).data.data;
//   console.log("name", user?.name)
//   return user;
// };

const initData = async () => {
  await getTableData();
  await getCategoryOptions();
};

onMounted(async () => {
  await initData();
});
</script>

<style>
.page-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  padding-right: 16px;
}
</style>
