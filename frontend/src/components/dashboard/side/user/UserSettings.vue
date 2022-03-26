<template>
  <transition name="slide">
    <div v-if="enableUserSettings" class="user-settings-container">
      <span @click="toggleUserSettings">geri</span>
      {{ enableUserSettings }}
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

//todo: bunu global yap arkadaş eklemede bu kullanılacak

export default {
  name: 'UserSettings',
  methods: {
    ...mapMutations('userSetting', ['toggleUserSettings'])
  },
  computed: {
    ...mapState('userSetting', ['enableUserSettings'])
  }
};
</script>

<style lang="scss" scoped>
.user-settings-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  top: 0;
  transition: 0.2s;
}

.slide-enter-active {
  animation: enter-active 0.4s;
}

.slide-leave-active {
  animation: leave-active 0.4s;
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
