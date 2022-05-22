<template>
  <div class="top-content-container">
    <img class="profile-image" :src="convertPath(friendUser?.image)" />
    <div class="user-info">
      <div class="name">{{ friendUser?.nameSurname }}</div>
      <div v-if="isWriting" class="writing">writing...</div>
      <div v-else-if="isActive" class="active">
        <i class="fa-solid fa-circle"></i>
        active
      </div>
      <div v-else-if="Object.keys(friendSocketUser).length > 0" class="last-active-date">
        {{ formatConverter(friendSocketUser.lastActiveDate) }}
      </div>
      <div v-else class="last-active-date">{{ formatConverter(friendUser?.lastActive) }}</div>
    </div>
    <div class="actions">
      <div class="settings">
        <i @click="toggleIsShowingSettingDropdown" class="fa-solid fa-ellipsis-vertical icon item"></i>
        <div v-if="isShowingSettingDropdown" class="dropdown">
          <div @click="deleteAllMessagesAction" class="link">delete all messages</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import handler from '@/shared/handler';
import socketChannels from '@/store/socket-channels';
import helpers from '@/helpers';
import socketActions from '@/store/socket-actions';

export default {
  name: 'TopContent',
  data() {
    return {
      friendUser: {},
      userIdsInWritingStatus: [],
      friendSocketUser: {},
      isShowingSettingDropdown: false
    };
  },
  watch: {
    activeUsers() {
      this.findUserFromActiveUsers();
    }
  },
  methods: {
    ...mapActions('friend', ['getFriend']),
    ...mapActions('message', ['deleteAllMessages']),
    async getFriendAction() {
      await handler(async () => {
        this.friendUser = await this.getFriend(this.selectedChatFriendId);
      });
    },
    deleteAllMessagesAction() {
      handler(async () => {
        await this.deleteAllMessages();
        socketActions.deleteMessage(this.$socket, { friendUserId: this.selectedUserId, userId: this.user._id });
      });
    },
    convertPath(path) {
      return helpers.convertToFullBackendPath(path);
    },
    findUserFromActiveUsers() {
      if (this.activeUsers) this.friendSocketUser = this.activeUsers.find(user => user._id === this.friendUser._id);
    },
    formatConverter(date) {
      return this.$dayjs(date).fromNow();
    },
    toggleIsShowingSettingDropdown() {
      this.isShowingSettingDropdown = !this.isShowingSettingDropdown;
    }
  },
  computed: {
    ...mapState('message', ['selectedChatFriendId', 'selectedUserId']),
    ...mapState('auth', ['user']),
    ...mapState('friend', ['activeUsers']),
    isWriting() {
      return this.userIdsInWritingStatus.filter(userId => userId !== this.user._id).length > 0;
    },
    isActive() {
      return this.friendSocketUser?.isActive;
    }
  },
  async created() {
    await this.getFriendAction();
    this.findUserFromActiveUsers();

    this.$socket.on(socketChannels.USER_IN_WRITING_STATUS, payload => this.userIdsInWritingStatus.push(payload));
    this.$socket.on(
      socketChannels.USER_IN_NOT_WRITING_STATUS,
      payload => (this.userIdsInWritingStatus = this.userIdsInWritingStatus.filter(userId => userId !== payload))
    );
  }
};
</script>

<style lang="scss" scoped>
.top-content-container {
  height: 90px;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid $blue-very-light-dark;

  .profile-image {
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;

    .name {
      font-size: 19px;
    }

    .last-active-date {
      font-size: 15px;
      margin-top: 3px;
      color: $blue-light-dark;
    }

    .writing {
      font-size: 15px;
      margin-top: 3px;
      color: #32b632;
    }

    .active {
      font-weight: 400;
      color: #32b632;

      i {
        font-size: 10px;
      }
    }
  }

  .actions {
    margin-left: auto;

    .item {
      &.fa-ellipsis-vertical {
        padding: 11px 18px 12px 18px;
      }
    }

    .settings {
      position: relative;

      .dropdown {
        @include center-md-box-shadow;
        position: absolute;
        background-color: white;
        border-radius: 10px;
        right: 0;
        top: 45px;
        width: 180px;
        z-index: 10;

        .link {
          padding: 10px 15px;
          font-size: 13px;
          color: #4e4e4e;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
