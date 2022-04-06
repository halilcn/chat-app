<template>
  <div v-if="selectedUserId" class="main-content-container">
    <top-content class="content" />
    <message-content />
    <send-message-content />
  </div>
  <chat-not-selected v-else class="main-content-container" />
</template>

<script>
import { mapState } from 'vuex';

import TopContent from '@/components/dashboard/main/TopContent';
import MessageContent from '@/components/dashboard/main/message/MessageContent';
import SendMessageContent from '@/components/dashboard/main/message/MessageSendContent';
import ChatNotSelected from '@/components/dashboard/main/ChatNotSelected';

export default {
  name: 'MainContent',
  components: {
    ChatNotSelected,
    TopContent,
    MessageContent,
    SendMessageContent
  },
  computed: {
    ...mapState('message', ['selectedUserId'])
  }
};
</script>

<style lang="scss" scoped>
.main-content-container {
  width: 100%;
  background-color: $default-bg-blue-color;
  display: flex;
  flex-direction: column;

  .content {
    padding: 20px;
  }
}
</style>
