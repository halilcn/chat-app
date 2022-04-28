<template>
  <div class="main-content-wrapper-container">
    <transition-group name="effect">
      <div v-if="selectedChatFriendId" class="main-content-container">
        <top-content class="content" />
        <message-content />
        <send-message-content />
      </div>
      <chat-not-selected v-if="!selectedChatFriendId" class="main-content-container" />
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import TopContent from '@/components/dashboard/main/TopContent';
import MessageContent from '@/components/dashboard/main/message/MessageContent';
import SendMessageContent from '@/components/dashboard/main/message/MessageSendContent';
import ChatNotSelected from '@/components/dashboard/main/ChatNotSelected';
import socketChannels from '@/store/socket-channels';

export default {
  name: 'MainContent',
  components: {
    ChatNotSelected,
    TopContent,
    MessageContent,
    SendMessageContent
  },
  methods: {
    ...mapActions('message', ['getMessages'])
  },
  computed: {
    ...mapState('message', ['selectedChatFriendId'])
  },
  watch: {
    selectedChatFriendId(newVal, oldVal) {
      this.getMessages();
      if (oldVal) this.$socket.emit(socketChannels.LEAVE_FRIEND_CHAT, oldVal);
      this.$socket.emit(socketChannels.JOIN_FRIEND_CHAT, newVal);
    }
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
}
</style>
