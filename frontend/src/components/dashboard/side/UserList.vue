<template>
  <div class="user-list-container">
    <div class="list">
      <div class="item not-readed">
        <img class="image" src="https://randomuser.me/api/portraits/men/40.jpg" />
        <div class="chat-info">
          <div class="name">Test İsim</div>
          <div class="last-message not-readed">Bu son mesajds adasd asdsa asda ...</div>
        </div>
        <div class="other-info">
          <div class="time">12:52</div>
          <div v-if="false" class="total-unread-message">4</div>
        </div>
      </div>
      <div class="item selected">
        <img class="image" src="https://randomuser.me/api/portraits/men/40.jpg" />
        <div class="chat-info">
          <div class="name">Test İsim</div>
          <div class="last-message">Bu son mesajds adasd asdsa asda ...</div>
        </div>
        <div class="other-info">
          <div class="time">12:52</div>
          <div v-if="false" class="total-unread-message">4</div>
        </div>
      </div>
      <div class="item">
        <img class="image" src="https://randomuser.me/api/portraits/men/40.jpg" />
        <div class="chat-info">
          <div class="name">Test İsim</div>
          <div class="last-message">Bu son mesajds adasd asdsa asda ...</div>
        </div>
        <div class="other-info">
          <div class="time">12:52</div>
          <div v-if="false" class="total-unread-message">4</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList'
};
</script>

<style lang="scss" scoped>
.list {
  .item {
    display: flex;
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: $light-grey-color;
    }

    &.selected {
      background-color: #f4f9ff;
    }

    &:not(.selected).not-readed {
      .last-message,
      .time {
        font-weight: 600;
        color: $blue-dark !important;
      }
    }

    .image {
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }

    .chat-info {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20px;

      .name {
        font-size: 17px;
        font-weight: 500;
      }

      .last-message {
        font-size: 14px;
        color: $blue-light-dark;
      }
    }

    .other-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;

      .time {
        font-size: 13px;
        color: $blue-light-dark;
      }
    }
  }
}
</style>
