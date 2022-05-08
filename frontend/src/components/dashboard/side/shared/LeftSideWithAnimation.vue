<template>
  <transition name="slide">
    <div v-if="enable" class="left-side-animation-container">
      <div class="top">
        <i @click="toggle" class="fa-solid fa-angle-left icon"></i>
        <div class="title">{{ title }}</div>
      </div>
      <div class="content">
        <slot />
      </div>
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
.left-side-animation-container {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: white;
  top: 0;
  transition: 0.2s;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .top {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 20px;
    border-bottom: 1px solid $blue-very-light-dark;

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
    margin-top: 30px;
    height: 100%;
  }
}

.slide-enter-active {
  animation: enter-active 0.4s ease;
}

.slide-leave-active {
  animation: leave-active 0.4s ease;
}

@keyframes enter-active {
  from {
    left: -100%;
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
    left: -100%;
  }
}
</style>
