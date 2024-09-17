<template>
  <div>
    <!-- 下载师生信息模板的按钮 -->
    <n-space>
      <n-button @click="downloadTemplate('老师示例.xlsx')"
        >下载教师信息模板</n-button
      >
      <n-button @click="downloadTemplate('学生示例.xlsx')"
        >下载学生信息模板</n-button
      >
    </n-space>

    <!-- Tab 分页 -->
    <n-tabs v-model:value="activeTab">
      <n-tab-pane name="teacher" tab="管理教师">
        <n-space>
          <n-upload
            :file-list="fileListT"
            action="http://43.143.229.82:8081/teacher/addTeacher"
            @before-upload="beforeUpload"
            @change="teacherUploadChange"
            @finish="finishAddingTeacher"
            :custom-request="customRequest"
          >
            <n-button>上传教师信息Excel(批量)</n-button>
          </n-upload>
          <n-button type="info" @click="showAddTeacherModal = true"
            >添加老师信息</n-button
          >
          <n-modal
            v-model:show="showAddTeacherModal"
            :mask-closable="false"
            preset="dialog"
            title="添加老师"
            positive-text="确认"
            negative-text="算了"
            @positive-click="confirmAddOneTeacher"
          >
            <n-form
              ref="formRef"
              :label-width="80"
              :model="addTeacherFormValue"
            >
              <n-form-item label="姓名" path="name">
                <n-input
                  v-model:value="addTeacherFormValue.name"
                  placeholder="输入姓名"
                />
              </n-form-item>
              <n-form-item label="工号" path="workId">
                <n-input
                  v-model:value="addTeacherFormValue.workId"
                  placeholder="输入工号"
                />
              </n-form-item>
              <n-form-item label="专业方向" path="major">
                <n-input
                  v-model:value="addTeacherFormValue.major"
                  placeholder="多个方向之间用'/'隔开,例如 '软件工程/网络安全'"
                />
              </n-form-item>
              <n-form-item label="可带学生" path="quota">
                <n-input-number
                  v-model:value="addTeacherFormValue.quota"
                  placeholder="可带学生数量"
                />
              </n-form-item>
              <n-form-item label="密码" path="password">
                <n-input
                  v-model:value="addTeacherFormValue.password"
                  placeholder="输入密码"
                />
              </n-form-item>
            </n-form>
          </n-modal>
        </n-space>

        <!-- 显示教师信息的表格 -->
        <n-data-table
          :columns="teacherColumns"
          :data="teacherData"
          :pagination="pagination"
        />
      </n-tab-pane>

      <n-tab-pane name="student" tab="管理学生">
        <n-space>
          <n-upload
            :file-list="fileListS"
            action="http://43.143.229.82:8081/user/addStudent"
            @before-upload="beforeUpload"
            @change="studentUploadChange"
            @finish="finishAddingStudent"
            :custom-request="customRequest"
          >
            <n-button>上传学生信息Excel</n-button>
          </n-upload>

          <n-button type="info" @click="showAddStudentModal = true"
            >添加学生信息</n-button
          >
          <n-modal
            v-model:show="showAddStudentModal"
            :mask-closable="false"
            preset="dialog"
            title="添加学生"
            positive-text="确认"
            negative-text="算了"
            @positive-click="confirmAddOneStudent"
          >
            <n-form
              ref="addStudentFormRef"
              :label-width="80"
              :model="addStudentFormValue"
            >
              <n-form-item label="姓名" path="name">
                <n-input
                  v-model:value="addStudentFormValue.name"
                  placeholder="输入姓名"
                />
              </n-form-item>
              <n-form-item label="学号" path="studentId">
                <n-input
                  v-model:value="addStudentFormValue.studentId"
                  placeholder="输入学号"
                />
              </n-form-item>
              <n-form-item label="专业" path="major">
                <n-input
                  v-model:value="addStudentFormValue.major"
                  placeholder="输入专业"
                />
              </n-form-item>
              <n-form-item label="密码" path="password">
                <n-input
                  v-model:value="addStudentFormValue.password"
                  placeholder="输入密码"
                />
              </n-form-item>
            </n-form>
          </n-modal>
        </n-space>

        <!-- 显示教师信息的表格 -->
        <n-data-table
          :columns="studentColumns"
          :data="studentData"
          :pagination="pagination"
        />
      </n-tab-pane>
    </n-tabs>

    <!-- 删除确认模态框 -->
    <n-modal
      v-model:show="showConfirmDelTeacher"
      preset="dialog"
      positive-text="确认"
      negative-text="算了"
      @positive-click="confirmDelTeacher"
      @negative-click="cancelDelTeacher"
    >
      <template #header>
        <div>确认删除数据</div>
      </template>
      <div>确定删除{{ nameToDel }}老师的数据，此操作不可复原</div>
    </n-modal>

    <n-modal
      v-model:show="showConfirmDelStudent"
      preset="dialog"
      positive-text="确认"
      negative-text="算了"
      @positive-click="confirmDelStudent"
      @negative-click="cancelDelStudent"
    >
      <template #header>
        <div>确认删除数据</div>
      </template>
      <div>确定删除{{ nameToDel }}同学的数据，此操作不可复原</div>
    </n-modal>

    <!-- 修改模态框 -->

    <n-modal
      v-model:show="showEditTeacherModal"
      :mask-closable="false"
      preset="dialog"
      title="修改老师"
      positive-text="确认修改"
      negative-text="算了"
      @positive-click="confirmEditTeacher"
    >
      <n-form :label-width="80" :model="editTeacherFormValue">
        <n-form-item label="姓名" path="name">
          <n-input
            v-model:value="editTeacherFormValue.name"
            placeholder="输入姓名"
          />
        </n-form-item>
        <n-form-item label="工号" path="workId">
          <n-input
            v-model:value="editTeacherFormValue.workId"
            placeholder="输入工号"
          />
        </n-form-item>
        <n-form-item label="专业方向" path="major">
          <n-input
            v-model:value="editTeacherFormValue.major"
            placeholder="多个方向之间用'/'隔开,例如 '软件工程/网络安全'"
          />
        </n-form-item>
        <n-form-item label="可带学生" path="quota">
          <n-input-number
            v-model:value="editTeacherFormValue.quota"
            placeholder="可带学生数量"
          />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="editTeacherFormValue.password"
            placeholder="输入密码"
          />
        </n-form-item>
      </n-form>
    </n-modal>

    <n-modal
      v-model:show="showEditStudentModal"
      :mask-closable="false"
      preset="dialog"
      title="修改同学"
      positive-text="确认修改"
      negative-text="算了"
      @positive-click="confirmEditStudent"
    >
      <n-form :label-width="80" :model="editStudentFormValue">
        <n-form-item label="姓名" path="name">
          <n-input
            v-model:value="editStudentFormValue.name"
            placeholder="输入姓名"
          />
        </n-form-item>
        <n-form-item label="工号" path="workId">
          <n-input
            v-model:value="editStudentFormValue.studentId"
            placeholder="输入工号"
          />
        </n-form-item>
        <n-form-item label="专业" path="major">
          <n-input
            v-model:value="editStudentFormValue.major"
            placeholder="软件工程"
          />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="editStudentFormValue.password"
            placeholder="输入密码"
          />
        </n-form-item>
      </n-form>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import { NButton, useMessage } from "naive-ui";
import {
  showAllStudent,
  showAllTeacher,
  addOneStudent,
  addOneTeacher,
  deleteOneTeacher,
  deleteOneStudent,
  updateOneStudent,
  updateOneTeacher,
} from "../../api/admin";
import { invokeApi } from "../../utils/invokeApi";
import { useUserStore } from "../../store/user";
import axios from "axios";
async function reloadT() {
  await invokeApi(showAllTeacher, teacherData);
}
async function reloadS() {
  await invokeApi(showAllStudent, studentData);
}
const teacherData = ref([]);
const studentData = ref([]);
reloadT();
reloadS();
const userStore = useUserStore();
const showAddStudentModal = ref(false);
const showAddTeacherModal = ref(false);
const showConfirmDelTeacher = ref(false);
const showConfirmDelStudent = ref(false);
const nameToDel = ref("");
const IdToDel = ref("");
const showEditTeacherModal = ref(false);
const showEditStudentModal = ref(false);
const editTeacherFormValue = ref({
  workId: "",
  password: "",
  quota: 0,
  name: "",
  major: "",
});
const editStudentFormValue = ref({
  studentId: "",
  password: "2024welcome",
  quota: 0,
  name: "",
  major: "",
})
// 定义修改行的操作
const editTRow = (row) => {
  const rowCopy = { ...row }; // 使用展开运算符进行浅拷贝
  editTeacherFormValue.value = rowCopy;
  // editTeacherFormValue.value.password = "123456";
  showEditTeacherModal.value = true;
};

const editSRow = (row) => {
  const rowCopy = { ...row }; // 使用展开运算符进行浅拷贝
  editStudentFormValue.value = rowCopy;
  // editStudentFormValue.value.password = "2024welcome";
  showEditStudentModal.value = true;
};

// 提交
const confirmEditTeacher = async () => {
  if(!editTeacherFormValue.value.password){
    Nmessage.error('密码不能为空')
  }else{
  // console.log(editTeacherFormValue.value);
  await invokeApi(updateOneTeacher,null,editTeacherFormValue.value)
  }
  reloadT()
};
const confirmEditStudent = async () => {
  if(!editStudentFormValue.value.password){
    Nmessage.error('密码不能为空')
  }else{
  // console.log(editTeacherFormValue.value);
  await invokeApi(updateOneStudent,null,editStudentFormValue.value)
  }
  reloadS()
};




const addStudentFormValue = ref({
  studentId: "",
  password: "2024welcome",
  name: "",
  major: "",
});

const addTeacherFormValue = ref({
  workId: "",
  password: "2024welcome",
  quota: 0,
  name: "",
  major: "",
});

async function confirmAddOneStudent() {
  await invokeApi(addOneStudent, null, addStudentFormValue.value);
  await invokeApi(showAllStudent, studentData);
}

async function confirmAddOneTeacher() {
  await invokeApi(addOneTeacher, null, addTeacherFormValue.value);
  await invokeApi(showAllTeacher, teacherData);
}

const activeTab = ref("teacher");

// 模板下载功能
const downloadTemplate = (filename) => {
  const link = document.createElement("a");
  link.href = `/${filename}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 使用 Naive UI 的消息组件
const Nmessage = useMessage();

function cancelDelTeacher() {
  nameToDel.value = " ";
  IdToDel.value = "";
}
async function confirmDelTeacher() {
  // const res = ref()
  await invokeApi(deleteOneTeacher, null, IdToDel.value);
  Nmessage.error(`删除: ${nameToDel.value}`);
  nameToDel.value = " ";
  IdToDel.value = "";
  await invokeApi(showAllTeacher, teacherData);
}
// 定义删除行的操作
const deleteTRow = async (row) => {
  // todo
  nameToDel.value = row.name;
  showConfirmDelTeacher.value = true;
  IdToDel.value = row.teacherId;
};

function cancelDelStudent() {
  nameToDel.value = " ";
  IdToDel.value = "";
}
async function confirmDelStudent() {
  await invokeApi(deleteOneStudent, null, IdToDel.value);
  Nmessage.error(`删除: ${nameToDel.value}`);
  nameToDel.value = " ";
  IdToDel.value = "";
  await invokeApi(showAllStudent, studentData);
}
// 定义删除行的操作
const deleteSRow = async (row) => {
  // todo
  nameToDel.value = row.name;
  showConfirmDelStudent.value = true;
  IdToDel.value = row.userId;
};

// 定义表格列
const teacherColumns = ref([
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "工号",
    key: "workId",
  },
  {
    title: "可带学生数量",
    key: "quota",
  },
  // {
  //   title: '密码',
  //   key: 'password',
  // },
  // {
  //     title: "专业方向",
  //     key: "major",
  //     render(row) {
  //         return row.major.map((tagKey) => {
  //         return h(
  //           NTag,
  //           {
  //             style: {
  //               marginRight: "6px",
  //             },
  //             type: "info",
  //             bordered: false
  //           },
  //           {
  //             default: () => tagKey
  //           }
  //         );
  //       });
  //     }
  //   },
  {
    title: "专业方向",
    key: "major",
  },
  {
    title: "操作",
    key: "actions",
    render(row) {
      return h("div", [
        // 修改按钮
        h(
          NButton,
          {
            size: "small",
            type: "primary",
            style: { marginRight: "8px" },
            onClick: () => editTRow(row),
          },
          { default: () => "修改" }
        ),
        // 删除按钮
        h(
          NButton,
          {
            size: "small",
            type: "error",
            onClick: () => deleteTRow(row),
          },
          { default: () => "删除" }
        ),
      ]);
    },
  },
]);

const studentColumns = ref([
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "学号",
    key: "studentId",
  },
  {
    title: "专业",
    key: "major",
  },
  {
    title: "操作",
    key: "actions",
    render(row) {
      return h("div", [
        // 修改按钮
        h(
          NButton,
          {
            size: "small",
            type: "primary",
            style: { marginRight: "8px" },
            onClick: () => editSRow(row),
          },
          { default: () => "修改" }
        ),
        // 删除按钮
        h(
          NButton,
          {
            size: "small",
            type: "error",
            onClick: () => deleteSRow(row),
          },
          { default: () => "删除" }
        ),
      ]);
    },
  },
]);

const pagination = ref({
  pageSize: 20,
});

// 上传功能和文件列表
const fileListT = ref([]);
const fileListS = ref([]);

const teacherUploadChange = ({ fileList: newFileList }) => {
  fileListT.value = newFileList;
};
const studentUploadChange = ({ fileList: newFileList }) => {
  fileListS.value = newFileList;
};
async function beforeUpload(data) {
  const allowedTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel", // 注意：.xls 文件通常使用这个MIME类型，但.xlsx 文件不会
  ];
  if (!allowedTypes.includes(data.file.file?.type)) {
    Nmessage.error("只能上传xlsx格式的表格文件，请重新上传");
    return false;
  }
  return true;
}

async function finishAddingTeacher() {
  await invokeApi(showAllTeacher, teacherData);
}
async function finishAddingStudent() {
  await invokeApi(showAllStudent, studentData);
}

const customRequest = ({
  file,
  data,
  headers,
  withCredentials,
  action,
  onFinish,
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
    .post(action, formData, {
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
    .then((response) => {
      Nmessage.success(JSON.stringify(response.data));
      onFinish();
    })
    .catch((error) => {
      Nmessage.error(error.message); // 通常使用 error.message 而不是 success
      onError();
    });
};
</script>

<style>
.n-dialog.n-modal {
  width: 800px;
  max-width: calc(100vw - 32px);
}
</style>
