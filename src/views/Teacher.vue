<template>
  <n-layout has-sider style="height: 100%">
    <!-- 左侧固定菜单栏 -->
    <n-layout-sider bordered width="200" class="sider">
      <n-menu
        style="padding-top: 30px"
        :options="menuOptions"
        @update:value="handleMenuSelect"
        default-value="firstRound"
        :value="menuOpNow"
      />
      <n-space>
      </n-space>
    </n-layout-sider>

    <!-- 右侧内容区 -->
    <n-layout-content id="teacherContent">
      <router-view />
    </n-layout-content>
  </n-layout>
</template>
<script setup>
import { ref } from "vue";
import { useMenuStore } from "../store/menu";
import { useRouter } from "vue-router";
const menuOpNow = ref("");
const menuStore = useMenuStore();
if (menuStore.menuOpNowTeacher) {
  menuOpNow.value = menuStore.menuOpNowTeacher;
} else {
  menuOpNow.value = "firstRound";
}
// 定义左侧菜单项
const menuOptions = [
{ label: "个人信息", key: "info" },
  { label: "第一轮选择", key: "firstRound" },
  { label: "第二轮选择", key: "secondRound" },
  { label: "选择结果", key: "result" },
];

const router = useRouter();

// 菜单选择处理
const handleMenuSelect = (key) => {
  if (key === "firstRound") {
    menuOpNow.value = "firstRound";
    menuStore.menuOpNowTeacher = menuOpNow.value;
    router.push("/teacher/firstRound");
  } else if (key === "secondRound") {
    menuOpNow.value = "secondRound";
    menuStore.menuOpNowTeacher = menuOpNow.value;
    router.push("/teacher/secondRound");
  } else if (key === "result") {
    menuOpNow.value = "result";
    menuStore.menuOpNowTeacher = menuOpNow.value;
    router.push("/teacher/result");
  }
  else if (key === "info") {
    menuOpNow.value = "info";
    menuStore.menuOpNowTeacher = menuOpNow.value;
    router.push("/teacher/info");
  }
};
</script>
<style scoped>
#teacherContent {
  padding-top: 60px;
}
.sider{
  background-image: url("../assets/bg1.png");
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;
}
</style>
