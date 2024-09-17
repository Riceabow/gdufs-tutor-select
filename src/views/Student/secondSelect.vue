<template>
  <div class="" v-if="isStarted">
    <div>
    <h1>第二轮</h1>
      <h2>第二轮可选导师情况</h2>
      <h4 v-if="!isShow" style="color: brown;">已完成导师选择或者该轮选择导师时间已过,无法进行选择</h4>
      <n-data-table :columns="columns1" :data="data1" :pagination="pagination"/>
    </div>

    <div style="height: 50px;"></div>
    <div>
      <h2>您的选择情况</h2>
      <n-data-table :columns="columns2" :data="chooseData" :pagination="pagination"/>
    </div>
  </div>
  <div class="" v-else>
    <h1>本轮选择导师时间尚未到，请耐心等待</h1>
  </div>

  <!-- 确认弹窗 -->
  <n-modal v-model:show="showModal" :mask-closable="true" style="background-color: #f0f8ff;">
    <div style="padding: 20px;">
      <p>确认选择后则无法更改，您确定要选择导师{{ selectedTutor.name }}吗？</p>
      <div style="text-align: right; margin-top: 20px;">
        <n-button @click="confirmChoose" type="primary" style="margin-right: 10px;">确认</n-button>
        <n-button @click="cancelModal" type="error">取消</n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup>
import { NButton, NTag, useMessage } from "naive-ui";
import { h, ref, computed, onMounted } from "vue";
import {
  showTeacherToStudent,
  chooseTeacher,
  showStudentResult,
  showAllTime,
} from "../../API/student";
import { invokeApi } from "../../utils/invokeApi";
const pagination = ref({
  pageSize: 20,
});
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
const isStarted = ref(true);
const isEnded = ref(false);
const chooseData = ref([]);
const haveSelected = computed(() => chooseData.value.choice || false);
const isShow = computed(() => !isEnded.value && !haveSelected.value);
const data1 = ref([
  {
    name: "加载数据失败，网络问题",
    major: ["方向1", "方向2"],
    studentNumber: 3,
    quota: 10,
  },
  // 其他导师对象
]);
async function reload() {
  await invokeApi(showTeacherToStudent, data1);
  await invokeApi(showStudentResult, res, { timeId: 2 });
  chooseData.value = [toRaw(res.value)];
  replaceResultWithStrings(chooseData)
  // console.log(chooseData.value)
  // console.log(chooseData.value);
}
const Nmessage = useMessage();
const showModal = ref(false);
const selectedTutor = ref(null);
const myMajor = ref("人工智能");  //todo
const res = ref();
const time = ref([]);

onMounted(async () => {
  try {
    await invokeApi(showAllTime, time);
  } catch (error) {
    Nmessage.error("加载时间失败，请稍后再试");
  }

  const secondRoundTime = time.value[1];
  const now = new Date();

  // 将字符串形式的时间转换为 Date 对象
  const startTime = new Date(secondRoundTime.startTime);
  const endTime = new Date(secondRoundTime.endTime);

  // 判断当前时间是否在给定的时间范围内
  if (now >= startTime && now <= endTime) {
    isStarted.value = true;
    reload();
  } else if (now > endTime) {
    reload();
    isEnded.value = true;
  } else {
    isStarted.value = false;
  }
});

const choose = (row) => {
  if (!row.major.includes(myMajor.value)) {
    Nmessage.warning("导师专业方向不匹配，谨慎选择！");
  }
  selectedTutor.value = row;
  showModal.value = true;
};

const confirmChoose = async () => {
  const row = selectedTutor.value;
  const res = ref();
  if (row.studentNumber >= row.quota) {
    Nmessage.error(`导师${row.name}的名额已满，无法选择`);
  } else {
    // 将选择的数据保存到 chooseData 中
    try {
      await invokeApi(
      chooseTeacher,
      null,
      {
        teacherId: row.teacherId,
      },
  
    );
      Nmessage.success(`您选择了导师${row.name}`);
      haveSelected.value = true;
    } catch (error) {
      Nmessage.error("选择导师失败");
    }



      reload();
  cancelModal()
  }

};
const cancelModal = () => {
  showModal.value = false;
};

const columns1 = ref([
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "专业方向",
    key: "major",
    render(row) {
      return row.major.map((tagKey) => {
        return h(
          NTag,
          {
            style: {
              marginRight: "6px",
            },
            type: "info",
            bordered: false,
          },
          {
            default: () => tagKey,
          }
        );
      });
    },
  },
  {
    title: "已经接收学生数量",
    key: "studentNumber",
  },
  {
    title: "可接收学生总量",
    key: "quota",
  },
  {
    title: "操作",
    key: "actions",
    render(row) {
      return h("div", [
        // 选择按钮
        isShow.value &&
          h(
            NButton,
            {
              size: "small",
              type: "primary",
              onClick: () => choose(row),
            },
            { default: () => "选择" }
          ),
      ]);
    },
  },
]);

const columns2 = ref([
  {
    title: "选择老师",
    key: "choice",
  },
  {
    title: "结果",
    key: "result",
  },
]);
</script>

<style scoped>
</style>
