<template>
  <div class="main-content-container">
    <top-content class="content" />
    <message-content class="content" />
    <send-message-content />
  </div>
</template>

<script>
import TopContent from '@/components/dashboard/main/TopContent';
import MessageContent from '@/components/dashboard/main/MessageContent';
import SendMessageContent from '@/components/dashboard/main/SendMessageContent';

export default {
  name: 'MainContent',
  components: {
    TopContent,
    MessageContent,
    SendMessageContent
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