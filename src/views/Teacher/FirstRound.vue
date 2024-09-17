<template>
  <div>
    <h1>第一轮</h1>
    <h2>已申请学生名单</h2>
    <n-data-table :columns="columns1" :data="data1" :pagination="pagination" />
  </div>
  <div style="height: 50px"></div>
  <div>
    <h2>已同意学生名单</h2>
    <n-data-table
      :columns="columns2"
      :data="agreedStudents"
      :pagination="pagination"
    />
  </div>
</template>
<script setup>
import { NButton, NTag, useMessage, NDataTable } from "naive-ui";
import { h, onMounted, ref } from "vue";
import { invokeApi } from "../../utils/invokeApi";
import { showSelectedStudent,selectStudent,notSelectStudent } from "../../api/teacher";

const reloadData = async()=>{
    await invokeApi(showSelectedStudent, data1, {
    timeId: 1,
    status: 1,
  });
  await invokeApi(showSelectedStudent, agreedStudents, {
    timeId: 1,
    status: 2,
  });
} 

onMounted(async () => {
  await reloadData()
});
const Nmessage = useMessage();

const agree = async(row) => {
  let res = ref()  
  await invokeApi(selectStudent,res,{studentId:row.userId,timeId:1},true)
  const {code,message,data} = res.value
  if(code != '200'){
    console.log(message)
    Nmessage.error("操作失败")
  }
else{
    await reloadData()
    Nmessage.info(`已同意${row.name}的申请`);
}
};


const check = (row) => {
    if(row.cvUrl){
        window.location.href = row.cvUrl;
        Nmessage.info("查看成功");
    }else{
        Nmessage.info("该生暂无上传简历");
    }

};

const remove = async(row) => {
  let res = ref()  
  await invokeApi(notSelectStudent,res,{studentId:row.userId,timeId:1},true)
  const {code,message,data} = res.value
  if(code != '200'){
    console.log(message)
    Nmessage.error("操作失败")
  }
else{
    await reloadData()
    Nmessage.info(`已移除${row.name}`);
}
};

const data1 = ref([
  {
    name: "请求数据失败",
    number: "可能是网络问题",
    check: "查看简历",
  },

]);
// 定义表格列
const columns1 = ref([
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "学号",
    key: "studentId",
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

  {
    title: "操作",
    key: "actions",
    render(row) {
      return h("div", [
        // 同意按钮
        h(
          NButton,
          {
            size: "small",
            type: "primary",
            onClick: () => agree(row),
          },
          { default: () => "同意" }
        ),
      ]);
    },
  },
]);

// 定义表格列
const columns2 = ref([
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "学号",
    key: "studentId",
  },
  {
    title: "查看简历",
    key: "check",
    render(row) {
      return h("div", [
        // 查看按钮
        h(
          NButton,
          {
            size: "small",
            onClick: () => check(row.cvUrl),
          },
          { default: () => "查看" }
        ),
      ]);
    },
  },

  {
    title: "操作",
    key: "actions",
    render(row) {
      return h("div", [
        // 移除按钮
        h(
          NButton,
          {
            size: "small",
            type: "warning",
            onClick: () => remove(row),
          },
          { default: () => "移除" }
        ),
      ]);
    },
  },
]);

const agreedStudents = ref([]);

const pagination = ref({
  pageSize: 5,
});
</script>
<style scoped></style>
