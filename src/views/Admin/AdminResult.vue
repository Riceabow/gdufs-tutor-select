<template>
  <div>
    <!-- 下载师生信息按钮 -->
    <!-- <n-space>
      <n-button @click="exportStudentInfo">导出学生选择情况</n-button>
      <n-button @click="exportTeacherInfo">导出导师被选情况</n-button>
    </n-space> -->
    <!-- Tab 分页 -->
    <n-tabs v-model:value="activeTab">
      <n-tab-pane name="teacher" tab="导师双选情况">
        <!-- 显示教师信息的表格 -->
        <h1>导师选择结果</h1>
        <n-data-table
          ref="tableRefT"
          :columns="columns2"
          :data="data2"
          :pagination="pagination"
        />
      </n-tab-pane>

      <n-tab-pane name="student" tab="学生双选情况">
        <h1>学生选择结果</h1>
        <n-data-table
          :columns="columns1"
          :data="data1"
          :pagination="pagination"
        />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMessage, NButton, NSpace, NDataTable } from "naive-ui";
import { showTeacherSituation,showStudentSituation } from "../../api/admin";
import { invokeApi } from "../../utils/invokeApi";
import { onMounted } from "vue";

const Nmessage = useMessage();
// 定义一个函数来替换result的值  
function replaceResultWithStrings(data) {  
  data.value.forEach(item => {  
    switch (item.firstResult) {  
      case 1:  
        item.firstResult = "待确认";  
        break;  
      case 2:  
        item.firstResult = "已同意";  
        break;  
      case 3:  
        item.firstResult = "超时未同意";  
        break;  
      case 4:  
        item.firstResult = "未作选择";  
        break;  
      default:  
        // 可以选择保留原值，或者设置为某个默认值  
        item.firstResult = "未知状态";  
    }
    switch (item.secondResult) {  
      case 1:  
        item.secondResult = "待确认";  
        break;  
      case 2:  
        item.secondResult = "已同意";  
        break;  
      case 3:  
        item.secondResult = "超时未同意";  
        break;  
      case 4:  
        item.secondResult = "未作选择";  
        break;  
      default:  
        // 可以选择保留原值，或者设置为某个默认值  
        item.secondResult = "未知状态";  
    }   
  });  
}  
onMounted(async()=>{
await invokeApi(showTeacherSituation,data2)
await invokeApi(showStudentSituation,data1)
replaceResultWithStrings(data1)
// console.log(data2.value)
// console.log(data1.value)
})

// 导出学生信息选择情况
// const exportStudentInfo = () => {
//   message.success("已导出");
// };

// 导出导师信息被选情况
// const exportTeacherInfo = () => {
//   message.success("已导出");
// };

const data1 = ref([
  // {
  //   studentName: "张三",
  //   studentId: "20210001",
  //   firstRoundResult: "A", // 一轮选择结果
  //   secondRoundResult: "B", // 二轮选择结果
  // },
]);

const data2 = ref([
  // {
  //   teacherId:0,
  //   workId:'12321',
  //   name: "李四",
  //   studentNumber: 3, // 被选学生数量
  //   quota: 6, // 导师可选总数量
  //   acceptedStudent:['aaa']
  // },
]);

const activeTab = ref("teacher");

const columns1 = ref([
  {
    title: "学生姓名",
    key: "name",
  },
  {
    title: "学号",
    key: "studentId",
  },
  {
    title: "一轮选择老师",
    key: "firstChoice",
  },
  {
    title: "一轮选择结果",
    key: "firstResult",
  },
  {
    title: "二轮选择老师",
    key: "secondChoice",
  },
  {
    title: "二轮选择结果",
    key: "secondResult",
  }
]);

const columns2 = ref([
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "工号",
    key: "workId",
  },
  {
    title: "接收学生数量",
    key: "studentNumber",
  },
  {
    title: "可带学生数量",
    key: "quota",
  },
]);

const pagination = {
  pageSize: 20,
};

</script>
<style scoped></style>
