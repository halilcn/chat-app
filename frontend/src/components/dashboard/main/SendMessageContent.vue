<template>
  <div class="send-message-content-container">
    <input class="message" type="text" value="asdasd asdkasd jalsdjaks dkd" />
    <div class="actions">
      <i class="fa-solid fa-paperclip item"></i>
      <div class="send-message-button item">
        <i class="fa-solid fa-paper-plane"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SendMessageContent'
};
</script>

<style lang="scss" scoped>
.send-message-content-container {
  margin: auto 20px 20px 20px;
  background-color: white;
  padding: 20px;
  border-radius: 100px;
  display: flex;
  justify-content: space-between;

  .message {
    width: 100%;
    border: 0;
  }

  .actions {
    display: flex;

    .item {
      margin-left: 10px;
    }
  }
}
</style>
