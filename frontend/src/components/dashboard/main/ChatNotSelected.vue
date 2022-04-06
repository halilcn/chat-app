<template>
  <div class="chat-not-selected">
    <lottie-player
      src="https://assets9.lottiefiles.com/packages/lf20_6mtrurjh.json"
      background="transparent"
      speed="1"
      style="width: 200px; height: 200px"
      loop
      autoplay />
    <div class="title">CHAT APP</div>
  </div>
</template>

<script>
export default {
  name: 'ChatNotSelected'
};
</script>

<style lang="scss" scoped>
.chat-not-selected {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    margin-top: 20px;
    font-size: 30px;
    font-weight: 700;
    color: #686868;
  }
}
</style>
