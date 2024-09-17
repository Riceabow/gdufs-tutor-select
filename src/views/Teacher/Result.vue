<template>
  <div>
    <h1>第一轮双选结果公示</h1>
    <n-data-table :columns="columns1" :data="data1" :pagination="pagination" />
  </div>
  <div style="height: 50px"></div>
  <div>
    <h1>第二轮双选结果公示</h1>
    <n-data-table :columns="columns2" :data="data2" :pagination="pagination" />
  </div>
</template>
<script setup>
import { NButton, NTag, useMessage, NDataTable } from "naive-ui";
import { h, ref } from "vue";
import { invokeApi } from "../../utils/invokeApi";
import { showSelectedStudent } from "../../api/teacher";
const pagination = ref({
  pageSize: 5,
});

const data1 = ref([
  {
    name: "请求数据失败",
    studentNumber: "可能是网络问题",
  },
]);

const data2 = ref([
  {
    name: "请求数据失败",
    studentNumber: "可能是网络问题",
  },
]);
const Nmessage = useMessage();

const reloadData = async () => {
  await invokeApi(showSelectedStudent, data1, {
    timeId: 1,
    status: 2,
  });
  await invokeApi(showSelectedStudent, data2, {
    timeId: 2,
    status: 2,
  });
};

onMounted(async () => {
  await reloadData();
});


const check = (row) => {
    if(row.cvUrl){
        window.location.href = row.cvUrl;
        Nmessage.info("查看成功");
    }else{
        Nmessage.info("该生暂无上传简历");
    }

};

const columns1 = ref([
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "学号",
    key: "studentNumber",
  },
  {
    title: "查看简历",
    key: "cvUrl",
    render(row) {
      return h("div", [
        // 查看按钮
        h(
          NButton,
          {
            size: "small",
            onClick: () => check(row),
          },
          { default: () => "查看" }
        ),
      ]);
    },
  },
]);

const columns2 = ref([
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "学号",
    key: "studentNumber",
  },
  {
    title: "查看简历",
    key: "cvUrl",
    render(row) {
      return h("div", [
        // 查看按钮
        h(
          NButton,
          {
            size: "small",
            onClick: () => check(row),
          },
          { default: () => "查看" }
        ),
      ]);
    },
  },
]);
</script>
<style scoped></style>
