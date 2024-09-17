<template>
  <div>
    <h3>{{ userStore.userInfo.value.name }} 同学，欢迎你！</h3>
    <h3>学号：{{ userStore.userInfo.value.studentId }}</h3>
    <h3>专业：{{ userStore.userInfo.value.major }}</h3>

    <h3>修改密码:(如果遗忘，联系管理员)</h3>
    <n-space class="" style="max-width: 300px">
      <n-input
        type="password"
        show-password-on="mousedown"
        placeholder="密码默认2024welcome"
        v-model:value="passwordUpdating"
      />
      <n-button inline type="primary" @click="updatePasswordClick">
      确定修改
    </n-button>
    </n-space>

    <div class="" style="height: 50px; width: 100%"></div>
    <a v-if="userStore.userInfo.value.cvUrl" :href="userStore.userInfo.value.cvUrl">
      <n-button  type="info"> 已上传简历查看 </n-button>
    </a>
    <n-space id="uploadContainer">
      <n-upload
      multiple
      directory-dnd
      action="http://43.143.229.82:8081/user/addResume"
      :max="1"
      @before-upload="beforeUpload"
      @change="cvUploadChange"
      :custom-request="customRequest"

    >
      <n-upload-dragger >
        <div style="margin-bottom: 12px; font-size: 30px">上传个人简历</div>
        <n-text style="font-size: 16px">
          点击或者拖动文件到该区域来上传
        </n-text>
        <n-p depth="3" style="margin: 8px 0 0 0">
          请上传<label style="color: brown; font-weight: bolder">PDF文件</label
          >,<b>可以多次上传更新</b>
        </n-p>
      </n-upload-dragger>
    </n-upload>
    </n-space>
    
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { invokeApi } from "../../utils/invokeApi";
import { useUserStore } from "../../store/user";
import { useMessage } from "naive-ui";
import { getUserDetail,updatePassword } from "../../API/student";
const passwordUpdating = ref('')
const updatePasswordClick = async()=>{
  const res = ref()
  if(passwordUpdating.value){
    await invokeApi(updatePassword,res,{password:passwordUpdating.value},true)
    if(res.value.code = '200'){
      Nmessage.success('更改成功')
    }else{
      Nmessage.error('更改失败')
    }
  }else{
    Nmessage.error('密码不能为空')
  }
}
const Nmessage = useMessage();
const userStore = useUserStore();
// onMounted(
// )

// 上传功能和文件列表
const fileList = ref([]);

const cvUploadChange = ({ fileList: newFileList }) => {
  fileList.value = newFileList;
};

async function beforeUpload(data) {
  const allowedTypes = ["application/pdf"];
  if (!allowedTypes.includes(data.file.file?.type)) {
    Nmessage.error("只能上传pdf格式的表格文件，请重新上传");
    return false;
  }
  return true;
}


const customRequest = ({
  file,
  data,
  headers,
  withCredentials,
  action,
  onError,
  onProgress,
}) => {
  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  }
  formData.append("file", file.file);

  axios
    .put(action, formData, {
      headers: {
        Authorization: "Bearer " + userStore.requestHeader.value.token,
        "Content-Type": "multipart/form-data", // 注意：当发送 FormData 时，不要显式设置 Content-Type
      },
      withCredentials,
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress({ percent: percentCompleted });
      },
    })
    .then(async(response) => {
      Nmessage.success(JSON.stringify(response.data));
      await invokeApi(getUserDetail, userStore.userInfo);
      // onFinish();
    })
    .catch((error) => {
      Nmessage.error(error.message); // 通常使用 error.message 而不是 success
      onError();
    });
};
</script>

<style scoped>
#uploadContainer {
  width: 300px;
}
</style>
