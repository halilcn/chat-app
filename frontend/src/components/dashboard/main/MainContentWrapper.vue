<template>
  <div class="main-content-container">
    <top-content class="content" />
    <message-content class="content" />
  </div>
</template>

<script>
import TopContent from '@/components/dashboard/main/TopContent';
import MessageContent from '@/components/dashboard/main/MessageContent';

export default {
  name: 'MainContent',
  components: {
    TopContent,
    MessageContent
  }
};
</script>

<style lang="scss" scoped>
.main-content-container {
  width: 100%;
  background-color: $default-bg-blue-color;

  .content {
    padding: 20px;
  }
}
</style>
