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
import { dailyExpenseService } from "@/api/expense/DailyExpense";
// import { userService } from "@/api/User";
import { dataUtils } from "@/utils/dataUtils";
import { onMounted, ref, watch } from "vue";
import CommonTable from "@/components/CommonTable.vue";
import CommonToolBar from "@/components/CommonToolBar.vue";
import CommonForm from "@/components/CommonForm.vue";
import { ccodeService } from "@/api/system/CCode";

// 通用表单
const formTitle = ref("日费用记录编辑");
const formData = ref({
  id: {
    lable: "id",
    value: "",
  },
  // year: {
  //   lable: "年份",
  //   value: "",
  //   type: "number",
  // },
  // month: {
  //   lable: "月份",
  //   value: "",
  //   type: "number",
  // },
  // day: {
  //   lable: "日期",
  //   value: "",
  //   type: "number",
  // },
  date: {
    lable: "日期",
    value: "",
    type: "date",
    required: true,
  },
  singleExpense: {
    lable: "单次支出",
    value: "",
    type: "number",
    precision: "2",
    required: true,
  },
  expenseReason: {
    lable: "支出原因",
    value: "",
    type: "selection",
    required: true,
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
    event:{
      selectChange: (val)=>{
        if(val && val==='UNEXPENSE'){
          formData.value.expenseContent.required = false;
          formData.value.expenseContent.value = '';
          formData.value.singleExpense.required = false;
          formData.value.singleExpense.value = 0;
        }

      }
    }
  },
  expenseContent: {
    lable: "消费内容",
    value: "",
    required: true,
  },
  dailyTotal: {
    lable: "日消费",
    value: "",
    precision: "2",
    type: `hidden`,
  },
  createByName: {
    lable: "创建人",
    value: "",
    type: `hidden`,
  },
  createTime: {
    lable: "创建时间",
    value: "",
    type: `hidden`,
  },
  updateByName: {
    lable: "更新人",
    value: "",
    type: `hidden`,
  },
  updateTime: {
    lable: "更新时间",
    value: "",
    type: "hidden",
  },
});
const categoryOptions = ref([]);
const getCategoryOptions = async () => {
  const resp = await ccodeService.categorySelector({category: "EXPENSE"});
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

  formData.value.expenseReason.options = [];
  for (let i in categoryOptions.value) {
    formData.value.expenseReason.options.push({ label: categoryOptions.value[i].describe, value:  categoryOptions.value[i].code, category: categoryOptions.value[i].category });
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
    const resp = await dailyExpenseService.update(formData);
    if (dataUtils.handleRespMessage(resp)) {
      closeForm();
      initData();
    }
  } else {
    const resp = await dailyExpenseService.add(formData);
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
  formTitle.value = "日费用记录新增";
  resetFormData();
  handleFormData();
  isShowForm.value = true;
};
const handlerUpdate = () => {
  isShowForm.value = true;
  handleFormData(selectedRows.value[0]);
  formTitle.value = "日费用记录编辑";
};
const handlerDelete = async () => {
  console.log("delete", selectedRows.value);
  const ids = [];
  selectedRows.value.map((item) => ids.push(item.id));
  const resp = await dailyExpenseService.deleteByIds({ ids: ids });
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
    prop: "index", // 可自定义一个不存在的prop（仅用于标识）
    width: 80,
    align: "center",
    // 关键：通过formatter结合行索引生成序号（index从0开始，+1变为从1开始）
    formatter: (row, column, cellValue, index) => {
      return index + 1; // 序号从1开始递增
    },
  },
  // {
  //   label: "ID",
  //   prop: "id",
  //   width: 80,
  //   align: "center",
  // },

  {
    label: "年份",
    prop: "year",
    width: 80,
    align: "center",
  },
  {
    label: "月份",
    prop: "month",
    width: 80,
    align: "center",
  },
  {
    label: "日期",
    prop: "day",
    width: 80,
    align: "center",
  },
  {
    label: "单次支出",
    prop: "singleExpense",
    width: 120,
    align: "center",
    formatter: (row) => `¥${row.singleExpense?.toFixed(2)}`,
  },
  {
    label: "支出原因",
    prop: "expenseReason",
    width: 150,
    align: "center",
  },
  {
    label: "支出内容",
    prop: "expenseContent",
    width: 180,
    align: "center",
  },
  {
    label: "每日总计",
    prop: "dailyTotal",
    width: 120,
    align: "center",
    formatter: (row) => `¥${row.dailyTotal?.toFixed(2)}`,
  },
  {
    label: "创建人",
    prop: "createByName",
    width: 120,
    align: "center",
    type: "slot",
  },
  {
    label: "创建时间",
    prop: "createTime",
    align: "center",
    // 格式化时间显示（可根据需要自定义）
    formatter: (row) => {
      if (!row.createTime) return "";
      return new Date(row.createTime).toLocaleString();
    },
  },
  {
    label: "更新人",
    prop: "updateByName",
    width: 120,
    align: "center",
  },
  {
    label: "更新时间",
    prop: "updateTime",
    align: "center",
    formatter: (row) => {
      if (!row.updateTime) return "";
      return new Date(row.updateTime).toLocaleString();
    },
  },
]);
const pageParams = ref({
  current: 1,
  size: 20,
  total: 10,
  page: 10,
});
const getTableData = async () => {
  const resp = await dailyExpenseService.getPage(pageParams.value);
  dataUtils.processRespData(tableData, resp, dataUtils.processMap.PAGE);
  dataUtils.processRespPageParams(pageParams, resp);
  for (let i in tableData.value) {
    tableData.value[i].expenseReason = dataUtils.formatExpenseReasonMap(tableData.value[i].expenseReason, categoryOptions.value);
    console.log
  }
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
