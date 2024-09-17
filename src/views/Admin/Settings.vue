<template>
  <div class="">
    <h1>设置第一轮选导师时间</h1>
    <n-date-picker
      v-model:formatted-value="firstRange"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetimerange"
      clearable
    />
  </div>

  <div style="height: 50px"></div>

  <n-space justify="center">
    <n-button type="success" @click="firstHandleClick"> 保存 </n-button>
  </n-space>

  <div class="">
    <h1>设置第二轮选导师时间</h1>
    <n-date-picker
      v-model:formatted-value="secondRange"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetimerange"
      clearable
    />
  </div>

  <div style="height: 50px"></div>

  <n-space justify="center">
    <n-button type="success" @click="secondHandleClick"> 保存 </n-button>
  </n-space>
</template>

<script setup>
import { useMessage } from "naive-ui";
import { ref } from "vue";
import { showAllTime,updateTime } from "../../api/admin";
import { invokeApi } from "../../utils/invokeApi";
const allTime = ref([]);
async function reloadTime() {
  await invokeApi(showAllTime, allTime);

if (allTime.value[0].startTime && allTime.value[1].startTime ){
  firstRange.value = [allTime.value[0].startTime,allTime.value[0].endTime]
  secondRange.value = [allTime.value[1].startTime,allTime.value[1].endTime]
}
}
onMounted(async () => {
  await reloadTime()
});

const Nmessage = useMessage();
// const firstRange = ref(["2024-09-15 12:00:00", "2024-09-20 23:59:59"]);
const firstRange = ref();
const secondRange = ref();
const firstHandleClick = async() => {
  let res = ref({})
  let updatedTime =
  {
  timeId: 1,
  startTime: firstRange.value[0],
  endTime: firstRange.value[1]
  }
  try {
  await invokeApi(updateTime,res,updatedTime,true)
  var {code,message} = res.value
  console.log("更新一轮时间",code, message)
  if(code == '200'){
    Nmessage.info("保存成功");
    await reloadTime()
  }
  else{
    Nmessage.error(message);
    await reloadTime()

  }
  } catch (error) {
    Nmessage.error('error');
    await reloadTime()

  }

};

const secondHandleClick = async() => {
  let res = ref({})
  let updatedTime =
  {
  timeId: 2,
  startTime: secondRange.value[0],
  endTime: secondRange.value[1]
  }
  try {
  await invokeApi(updateTime,res,updatedTime,true)
  let {code,message} = res.value
  console.log("更新二轮时间",code, message)
  if(code == '200'){
    Nmessage.info("保存成功");
    await reloadTime()

  }
  else{
    Nmessage.error(message);
    await reloadTime()

  }
  } catch (error) {
    Nmessage.error("error");
    await reloadTime()

  }

};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 使容器占满整个视口高度 */
}
</style>
