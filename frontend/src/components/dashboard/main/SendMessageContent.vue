<template>
  <div class="send-message-content-container">
    <input class="message" type="text"  placeholder="Your message..."/>
    <div class="actions">
      <i class="fa-solid fa-face-smile item icons"></i>
      <i class="fa-solid fa-paperclip item file"></i>
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
    max-height: 300px;
    border: 0;
    overflow-y: auto;
    color: $blue-dark;

    &::placeholder{
      color: $blue-light-dark;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    font-size: 20px;

    .item {
      margin-left: 15px;

      &.send-message-button{
        color: $default-purple;
      }
    }
  }
}
</style>
