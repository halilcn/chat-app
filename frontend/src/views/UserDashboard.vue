<template>
  <transition-group name="effect">
    <loading-dashboard v-if="isLoading" key="loading" />
    <div v-if="!isLoading" key="dashboard" class="dashboard-container">
      <left-side />
      <main-content />
    </div>
  </transition-group>
</template>

<script>
import { mapState } from 'vuex';

import LeftSide from '@/components/dashboard/side/LeftSideWrapper.vue';
import MainContent from '@/components/dashboard/main/MainContentWrapper.vue';
import LoadingDashboard from '@/components/dashboard/others/LoadingDashboard';
import socketChannels from '@/store/socket-channels';

export default {
  name: 'UserDashboard',
  data() {
    return {
      isLoading: true
    };
  },
  components: {
    LoadingDashboard,
    LeftSide,
    MainContent
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  created() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

    this.$socket.emit(socketChannels.LOGIN, { userId: this.user._id });
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: 100%;
  display: flex;
}

.effect-enter-active {
  animation: enter-active 0.4s;
}

.effect-leave-active {
  animation: leave-active 0.4s;
}

@keyframes enter-active {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes leave-active {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
