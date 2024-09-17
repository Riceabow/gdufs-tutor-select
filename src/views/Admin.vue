<template>
  <n-layout has-sider style="height: 100%">
    <!-- 左侧固定菜单栏 -->
    <n-layout-sider bordered width="200" class="sider">
      <n-menu
        style="padding-top: 30px"
        :options="menuOptions"
        @update:value="handleMenuSelect"
        :value="menuOpNow"
      />
    </n-layout-sider>

    <!-- 右侧内容区 -->
    <n-layout-content id="adminContent">
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
if (menuStore.menuOpNowAdmin) {
  menuOpNow.value = menuStore.menuOpNowAdmin;
} else {
  menuOpNow.value = "manage";
}
// 定义左侧菜单项
const menuOptions = [
  { label: "管理师生信息", key: "manage" },
  { label: "设置选导时间", key: "settings" },
  { label: "实时双选情况", key: "result" },
];

const router = useRouter();

// 菜单选择处理
const handleMenuSelect = (key) => {
  if (key === "manage") {
    menuOpNow.value = 'manage'
    menuStore.menuOpNowAdmin = menuOpNow.value
    router.push("/admin/manage");
  } else if (key === "settings") {
    menuOpNow.value = 'settings'
    menuStore.menuOpNowAdmin = menuOpNow.value
    router.push("/admin/settings");
  } else if (key === "result") {
    menuOpNow.value = 'result'
    menuStore.menuOpNowAdmin = menuOpNow.value
    router.push("/admin/result");
  }
};
</script>

<style scoped>
/* 样式可以根据需求调整 */
#adminContent {
  padding-top: 60px;
}
.sider{
  background-image: url("../assets/bg1.png");
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;
}
</style>
