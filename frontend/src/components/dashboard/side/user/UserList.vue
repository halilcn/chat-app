<template>
  <div class="user-list-container">
    <div v-if="userListMessages.length > 0" class="list">
      <div v-for="(message, index) in userListMessages" :key="index" class="item selected not-readed">
        <img class="image" :src="message.user.image" />
        <div class="chat-info">
          <div class="name">{{ message.user.nameSurname }}</div>
          <div class="last-message" :class="{ 'not-readed': userHasUnreadMessages(message.unReadMessagesCount) }">
            {{ message.lastMessage.content }}
          </div>
        </div>
        <div class="other-info">
          <div class="time">{{ this.$dayjs(message.lastMessage.createdAt).format('hh:mm') }}</div>
          <div v-if="userHasUnreadMessages(message.unReadMessagesCount)" class="total-unread-message">
            {{ message.unReadMessagesCount }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-chat">No chat</div>
  </div>
</template>

<script>
import * as dayjs from 'dayjs';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'UserList',
  methods: {
    ...mapActions('message', ['getUserListMessages']),
    userHasUnreadMessages(count) {
      return count > 0;
    }
  },
  created() {
    this.getUserListMessages();
  },
  computed: {
    ...mapState('message', ['userListMessages'])
  }
};
</script>

<style lang="scss" scoped>
.user-list-container {
  .no-chat {
    margin-top: 20px;
    text-align: center;
    font-size: 18px;
    color: #8e8e8e;
  }

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
}
</style>
