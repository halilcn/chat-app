<template>
  <div class="dashboard-loading-container">
    <lottie-player
      src="https://assets5.lottiefiles.com/packages/lf20_Stt1R6.json"
      background="transparent"
      speed="0.9"
      style="width: 120px; height: 120px"
      loop
      autoplay />
  </div>
</template>

<script>
export default {
  name: 'LoadingDashboard'
};
</script>

<style lang="scss" scoped>
.dashboard-loading-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $default-bg-blue-color;
}
</style>
