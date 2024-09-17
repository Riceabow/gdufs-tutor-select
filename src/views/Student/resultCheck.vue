<template>
  <div>

    <h1>第一轮双选结果</h1>
    <n-data-table :columns="columns" :data="data1" />

  </div>

  <div style="height: 50px;"></div>

  <div>

    <h1>第二轮双选结果</h1>
    <n-data-table :columns="columns" :data="data2" />
  </div>

</template>

<script setup>


import {ref} from "vue";
import {NDataTable} from "naive-ui";
import {
  showStudentResult,
} from "../../API/student";
import { invokeApi } from "../../utils/invokeApi";
const res = ref()
// 定义一个函数来替换result的值  
function replaceResultWithStrings(data) {  
  data.value.forEach(item => {  
    switch (item.result) {  
      case 1:  
        item.result = "待确认";  
        break;  
      case 2:  
        item.result = "已同意";  
        break;  
      case 3:  
        item.result = "超时未同意";  
        break;  
      case 4:  
        item.result = "未作选择";  
        break;  
      default:  
        // 可以选择保留原值，或者设置为某个默认值  
        item.result = "未知状态";  
    }  
  });  
}  
async function reload() {
  await invokeApi(showStudentResult, res, { timeId: 1 });
  data1.value = [toRaw(res.value)];
  replaceResultWithStrings(data1)
  await invokeApi(showStudentResult, res, { timeId: 2 });
  data2.value = [toRaw(res.value)];
  replaceResultWithStrings(data2)
}
reload()

const data1 = ref([
  {
    choice: '',
    result: 4
  }
]);
const data2 = ref([
  {
    choice: '张三',
    result: 1
  }
]);

const columns = [
  {
    title: '姓名',
    key: 'choice'
  },
  {
    title: '选择结果',
    key:'result'
  }
];

</script>

<style scoped>

</style>
