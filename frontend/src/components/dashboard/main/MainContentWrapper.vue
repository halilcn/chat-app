<template>
  <div class="main-content-wrapper-container">
    <transition name="effect" mode="out-in">
      <div v-if="selectedChatFriendId" :key="contentDynamicKeyToRender" class="main-content-container">
        <top-content class="content" />
        <message-content />
        <send-message-content />
      </div>
      <chat-not-selected v-else key="chat-now-selected" class="main-content-container" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import TopContent from '@/components/dashboard/main/TopContent';
import MessageContent from '@/components/dashboard/main/message/MessageContent';
import SendMessageContent from '@/components/dashboard/main/message/MessageSendContent';
import ChatNotSelected from '@/components/dashboard/main/ChatNotSelected';
import socketActions from '@/store/socket-actions';

export default {
  name: 'MainContent',
  data() {
    return {
      contentDynamicKeyToRender: Math.random()
    };
  },
  components: {
    ChatNotSelected,
    TopContent,
    MessageContent,
    SendMessageContent
  },
  watch: {
    selectedChatFriendId(newVal, oldVal) {
      this.contentDynamicKeyToRender = Math.random();

      if (oldVal) socketActions.leaveFriendChat(this.$socket, oldVal);
      socketActions.joinFriendChat(this.$socket, newVal);
    }
  },
  computed: {
    ...mapState('message', ['selectedChatFriendId'])
  }
};
</script>

<style lang="scss" scoped>
.main-content-wrapper-container {
  width: 100%;
  height: 100%;
  background-color: $default-bg-blue-color;

  .main-content-container {
    width: 100%;
    height: 100%;
    background-color: $default-bg-blue-color;
    display: flex;
    flex-direction: column;

    .content {
      padding: 20px;
    }
  }

  .effect-enter-active {
    animation: enter-active 0.3s;
  }

  .effect-leave-active {
    animation: leave-active 0.3s;
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
}
</style>
