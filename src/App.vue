<script setup>
</script>

<template>
  <div id="Container">
    <div id="Header">
      <img id="logo" src="./assets/logo1.png" alt="" />
      <span id="bigTitle">广外研究生导师双选系统</span>
      <span id="hint">系统使用过程有问题微信添加Riceabow20</span>
    </div>
    <div id="space60"></div>
    <n-message-provider>
      <n-modal-provider>
        <RouterView id="views" />
      </n-modal-provider>
    </n-message-provider>
  </div>
</template>

<style scoped>
#space60 {
  height: 60px;
  width: 100%;
}
#views {
  flex-grow: 1;
}
#Container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url("./assets/bg6.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  /* overflow-y: hidden; */
}

#hint {
  position: absolute;
  right: 0;
}
#Header {
  display: flex;
  z-index: 3;
  position: absolute;
  top: 0px;
  height: 60px;
  width: 100%;
  align-items: center;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
#bigTitle {
  font-size: 40px;
}
#logo {
  margin-left: 40px;
  height: 100%;
  margin-right: 30px;
}
#loginHeader {
  margin: 0;
  padding: 0;
}
</style>
