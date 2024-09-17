<template>
    <n-layout has-sider style="height: 100%;">
      <!-- 左侧固定菜单栏 -->
      <n-layout-sider bordered width="200" class="sider">
        <n-menu style="padding-top: 30px;"
          :options="menuOptions"
          @update:value="handleMenuSelect"
          :value = 'menuOpNow'
        />
      </n-layout-sider>
  
      <!-- 右侧内容区 -->
      <n-layout-content id="studentContent">
        <router-view  />
      </n-layout-content>
    </n-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useMenuStore } from '../store/menu';
const menuOpNow = ref('')
  const menuStore = useMenuStore()
  if(menuStore.menuOpNowStudent){
    menuOpNow.value = menuStore.menuOpNowStudent
  }
  else{
    menuOpNow.value = "info"
  }
  // 菜单选择处理
  const router = useRouter()

  const handleMenuSelect = (key) => {

    if (key === 'info') {
      menuOpNow.value = 'info'
      menuStore.menuOpNowStudent = menuOpNow.value
      router.push('/student/info')
    } else if (key === 'firstSelect') {
      menuOpNow.value = 'firstSelect'
      menuStore.menuOpNowStudent = menuOpNow.value
      router.push('/student/firstSelect')
    } else if (key === 'secondSelect') {
      menuOpNow.value = 'secondSelect'
      menuStore.menuOpNowStudent = menuOpNow.value
      router.push('/student/secondSelect')
    } else if (key === 'result') {
      menuOpNow.value = 'result'
      menuStore.menuOpNowStudent = menuOpNow.value
      router.push('/student/result')
    }
  }
 // 定义左侧菜单项
 const menuOptions = [
    { label: '个人信息', key: 'info' },
    { label: '第一轮导师选择', key: 'firstSelect' },
    { label: '第二轮导师选择', key: 'secondSelect' },
    { label: '选择结果查看', key: 'result' },
  ]
</script>

<style scoped>
#studentContent{
    padding-top: 60px;
}
.sider{
  background-image: url("../assets/bg1.png");
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;
}
</style>
