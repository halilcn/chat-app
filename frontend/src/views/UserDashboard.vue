<template>
  <transition-group name="effect">
    <loading-dashboard data-testid="loading" v-if="isLoading" key="loading" />
    <div v-if="!isLoading" key="dashboard" class="dashboard-container">
      <left-side data-testid="leftSide" />
      <main-content data-testid="mainContent" />
    </div>
  </transition-group>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import LeftSide from '@/components/dashboard/side/LeftSideWrapper.vue';
import MainContent from '@/components/dashboard/main/MainContentWrapper.vue';
import LoadingDashboard from '@/components/dashboard/others/LoadingDashboard';
import socketActions from '@/store/socket-actions';
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
  methods: {
    ...mapMutations('friend', ['setActiveUsers'])
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  created() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

    socketActions.login(this.$socket, this.user._id);
    this.$socket.on(socketChannels.ACTIVE_USERS, activeUsers => this.setActiveUsers(activeUsers));
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
