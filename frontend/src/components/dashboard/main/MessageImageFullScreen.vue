<template>
  <div @click="$emit('disableScreen')" v-if="path" class="message-image-full-screen-container">
    <div class="filter"></div>
    <img class="image" :src="path" />
  </div>
</template>

<script>
export default {
  name: 'MessageShowImage',
  emits: ['disableScreen'],
  props: {
    path: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.message-image-full-screen-container {
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .filter {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.3;
    z-index: 1;
  }

  .image {
    position: absolute;
    z-index: 5;
    border-radius: 20px;
  }
}
</style>
