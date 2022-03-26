<template>
  <transition name="slide">
    <div v-if="enable" class="left-side-animation-container">
      <div class="top">
        <i @click="toggle" class="fa-solid fa-angle-left icon"></i>
        <div class="title">{{ title }}</div>
      </div>
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LefSideWithAnimation',
  props: {
    enable: {
      type: Boolean,
      required: true
    },
    toggle: {
      type: Function,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
//todo:animation
.left-side-animation-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  top: 0;
  transition: 0.2s;
  padding: 20px;

  .top {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    i {
      font-size: 20px;
      padding: 15px;
      border-radius: 10px;
    }

    .title {
      margin-left: 20px;
      font-size: 20px;
      color: $blue-dark;
    }
  }

  .content {
    margin-top: 10px;
    background-color: red;
  }
}

.slide-enter-active {
  animation: enter-active 0.3s linear;
}

.slide-leave-active {
  animation: leave-active 0.3s linear;
}

@keyframes enter-active {
  from {
    left: -700px;
  }
  to {
    left: 0;
  }
}

@keyframes leave-active {
  from {
    left: 0;
  }
  to {
    left: -700px;
  }
}
</style>
