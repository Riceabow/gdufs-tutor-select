<template>
  <div>
    <h2>{{ userInfo.name }} 老师，欢迎你！</h2>
    <h3>若以下信息有误请联系管理员修改</h3>
    <h3>工号：{{ userInfo.workId }}</h3>
    <h3>专业方向：{{ userInfo.major }}</h3>

    <h3>修改密码:(如果遗忘，联系管理员)</h3>
    <n-space class="" style="max-width: 300px">
      <n-input
        type="password"
        show-password-on="mousedown"
        placeholder="输入密码"
        v-model:value="passwordUpdating"
      />
      <n-button inline type="primary" @click="updatePasswordClick">
        确定修改
      </n-button>
    </n-space>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { invokeApi } from "../../utils/invokeApi";
import { useUserStore } from "../../store/user";
import { useMessage } from "naive-ui";
import { updateTeacherPassword } from "../../API/teacher";
const passwordUpdating = ref("");

const updatePasswordClick = async () => {
  const res = ref();
  if (passwordUpdating.value) {
    await invokeApi(
      updateTeacherPassword,
      res,
      { password: passwordUpdating.value },
      true
    );
    if ((res.value.code = "200")) {
      Nmessage.success("更改成功");
    } else {
      Nmessage.error("更改失败");
    }
  } else {
    Nmessage.error("密码不能为空");
  }
};

const Nmessage = useMessage();
const userStore = useUserStore();
const userInfo = userStore.userInfo.value;
// onMounted(
// )
</script>

<style scoped>
#uploadContainer {
  width: 300px;
}
</style>
