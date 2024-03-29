<template>
  <div class="user-list-container">
    <div data-testid="userList" v-if="userListMessages.length > 0" class="list">
      <div
        data-testid="userListItem"
        v-for="(message, index) in userListMessages"
        :key="index"
        @click="selectUserChat(message)"
        class="item"
        :class="{ selected: isSelectedUserChat(message.friendId), 'not-readed': userHasUnreadMessages(message.unReadMessagesCount) }">
        <div class="image-container">
          <img alt="user_image" :src="convertPath(message.user.image)" />
          <div v-if="isActive(message.user._id)" class="active"><i class="fa-solid fa-circle"></i></div>
        </div>
        <div class="chat-info">
          <div class="name">{{ message.user.nameSurname }}</div>
          <div class="last-message">
            {{ message.lastMessage.content }}
          </div>
        </div>
        <div class="other-info">
          <div class="time">{{ this.$dayjs(message.lastMessage.createdAt).format('hh:mm') }}</div>
          <div data-testid="totalUnreadMessage" v-if="userHasUnreadMessages(message.unReadMessagesCount)" class="total-unread-message">
            {{ message.unReadMessagesCount }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-chat">No chat</div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import helpers from '@/helpers';

export default {
  name: 'UserList',
  data() {
    return {
      activeUserIds: []
    };
  },
  methods: {
    ...mapActions('message', ['getUserListMessages']),
    ...mapMutations('message', ['setSelectedChatFriendId', 'setSelectedUserId']),
    userHasUnreadMessages(count) {
      return count > 0;
    },
    selectUserChat(message) {
      this.setSelectedChatFriendId(message.friendId);
      this.setSelectedUserId(message.user._id);
    },
    isSelectedUserChat(friendId) {
      return this.selectedChatFriendId === friendId;
    },
    isActive(userId) {
      return this.activeUserIds.includes(userId);
    },
    convertPath(path) {
      if (helpers.isRemoteServerUrl(path)) return path;

      return helpers.convertToFullBackendPath(path);
    },
    findActiveUserIds() {
      this.activeUserIds = this.activeUsers.filter(user => user.isActive).map(user => user._id);
    }
  },
  watch: {
    activeUsers() {
      this.findActiveUserIds();
    }
  },
  computed: {
    ...mapState('message', ['userListMessages', 'selectedChatFriendId']),
    ...mapState('friend', ['friendsList', 'activeUsers'])
  },
  created() {
    this.getUserListMessages();
    this.findActiveUserIds();
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

      .image-container {
        position: relative;

        img {
          width: 50px;
          height: 50px;
          border-radius: 100%;
        }

        .active {
          color: #32b632;
          font-size: 10px;
          position: absolute;
          right: 0;
          bottom: 0;

          i {
            border: 3px solid #ffffff;
            border-radius: 100%;
          }
        }
      }

      .chat-info {
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
        margin-left: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;

        .time {
          font-size: 13px;
          color: $blue-light-dark;
        }

        .total-unread-message {
          font-size: 12px;
          font-weight: 600;
          color: $blue-dark;
        }
      }
    }
  }
}
</style>
