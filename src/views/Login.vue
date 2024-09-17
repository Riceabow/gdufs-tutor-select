<template>
  <div class="loginContainer">
    <!-- 使用卡片组件包裹登录表单 -->
    <n-card title="登录" class="login-card">
      <n-form ref="formRef" :model="formValue" :rules="rules">
        <!-- 用户名输入框 -->
        <n-form-item label="用户名" path="username">
          <n-input
            v-model:value="formValue.username"
            placeholder="用户名为学号或者工号"
          />
        </n-form-item>
        <!-- 密码输入框 -->
        <n-form-item label="密码" path="password">
          <n-input
            type="password"
            v-model:value="formValue.password"
            placeholder="请输入密码"
          />
        </n-form-item>
        <n-form-item label="选择角色" path="radioGroupValue">
          <n-radio-group v-model:value="formValue.character" name="radiogroup1">
            <n-space>
              <n-radio value="学生"> 学生 </n-radio>
              <n-radio value="教师"> 教师 </n-radio>
              <n-radio value="管理员"> 管理员 </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <!-- 按钮组 -->
        <n-space>
          <!-- 登录按钮 -->
          <n-button type="primary" @click="handleValidateClick">登录</n-button>
          <!-- 重置按钮 -->
          <n-button type="default" @click="onReset">重置</n-button>
          忘记密码联系管理员
        </n-space>
      </n-form>
    </n-card>

    <!-- <pre>{{ JSON.stringify(formValue, null, 2) }}</pre> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import router from "../router";
import { invokeApi } from "../utils/invokeApi";
import { adminLogin } from "../api/admin";
import { studentLogin,getUserDetail} from '../api/student'
import { teacherLogin,getTeacherDetail} from '../api/teacher'
import { useUserStore } from "../store/user";
import { useMenuStore } from "../store/menu";

const formValue = ref({
  username: "",
  password: "",
  character: "学生",
});

const loginValue = ref({
  studentId:"",
  workId:"",
  username: "",
  password: "",
});

// 表单验证规则
const rules = {
  username: {
    required: true,
    message: "用户名不能为空",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "密码不能为空",
    trigger: ["input", "blur"],
  },
};

const formRef = ref(null);
const Nmessage = useMessage();

async function login(character,api) {
  loginValue.value.username = formValue.value.username;
  loginValue.value.studentId = formValue.value.username;
  loginValue.value.workId = formValue.value.username;
  loginValue.value.password = formValue.value.password;
  const loginRes = ref({})
  // console.log(loginValue.value);
  await invokeApi(api, loginRes, loginValue.value,true);
  const {code, message, data} = loginRes.value
  console.log(loginRes.value)
  if(code !='200'){
    Nmessage.error("登录失败:"+ message);
  }else{
    const userStore = useUserStore()
    const menuStore = useMenuStore()
    menuStore.menuOpNowAdmin = ''
    menuStore.menuOpNowStudent = ''
    menuStore.menuOpNowTeacher = ''
    userStore.userRole = character
    userStore.requestHeader.value = data
    if(character == 'student'){
      await invokeApi(getUserDetail,userStore.userInfo)

    }
    if(character == 'teacher'){
      await invokeApi(getTeacherDetail,userStore.userInfo)
    }
    // console.log(userStore.userInfo.value)
    Nmessage.success("登陆成功")
    router.push("/"+character);
  }
  // try {
  //   await invokeApi(api, userStore.requestHeader, loginValue.value);
  //   router.push(character);
  // } catch (error) {
  //   console.error("Failed to login:", error);
  // }
}

// 提交时验证表单数据
const handleValidateClick = (e) => {
  e.preventDefault();
  const messageReactive = Nmessage.loading("Verifying", {
    duration: 0,
  });
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      // login GET
      switch (formValue.value.character) {
        case "学生":
          await login("student",studentLogin);
          console.log(loginValue.value);
          break;
        case "教师":
          await login("teacher",teacherLogin);
          console.log(loginValue.value);
          break;
        case "管理员":
          await login("admin",adminLogin);
          console.log(loginValue.value);
          break;
        default:
          break;
      }
      console.log(loginValue.value);

      // 发送登录请求
      // message.success("登陆成功");
    } else {
      Nmessage.error("登录错误");
      console.log("errors", errors);
    }
    messageReactive.destroy();
  });
};

// 重置表单
const onReset = () => {
  formValue.value.username = "";
  formValue.value.password = "";
};
</script>

<style scoped>
.loginContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  max-width: 400px;
  /* margin: 100px auto; */
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

n-form-item {
  margin-bottom: 16px;
}
</style>
