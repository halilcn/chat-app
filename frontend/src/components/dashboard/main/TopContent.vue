<template>
  <div class="top-content-container">
    <img class="profile-image" :src="convertPath(friendUser.image)" />
    <div class="user-info">
      <div class="name">{{ friendUser.nameSurname }}</div>
      <div v-if="isWriting" class="writing">writing...</div>
      <div v-else-if="isActive" class="active">
        <i class="fa-solid fa-circle"></i>
        active
      </div>
      <div v-else class="last-active-date">bugün 12:40</div>
    </div>
    <div class="actions">
      <i class="fa-solid fa-ellipsis-vertical icon item"></i>
    </div>
  </div>

  {{ friendSocketUser }}
  {{ activeUsers }}
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

import handler from '@/shared/handler';
import socketChannels from '@/store/socket-channels';
import helpers from '@/helpers';

//todo: db'den last active verisinide döndür ?
//todo: socket'ten gelen last active tarihi ?
export default {
  name: 'TopContent',
  data() {
    return {
      friendUser: {},
      userIdsInWritingStatus: [],
      friendSocketUser: {}
    };
  },
  watch: {
    activeUsers() {
      this.findUserFromActiveUsers();
    }
  },
  methods: {
    ...mapActions('friend', ['getFriend']),
    async getFriendAction() {
      await handler(async () => {
        this.friendUser = await this.getFriend(this.selectedChatFriendId);
      });
    },
    convertPath(path) {
      return helpers.convertToFullBackendPath(path);
    },
    findUserFromActiveUsers() {
      this.friendSocketUser = this.activeUsers.find(user => user._id === this.friendUser._id);
    }
  },
  computed: {
    ...mapState('message', ['selectedChatFriendId']),
    ...mapState('auth', ['user']),
    ...mapState('friend', ['activeUsers']),
    isWriting() {
      return this.userIdsInWritingStatus.filter(userId => userId !== this.user._id).length > 0;
    },
    isActive() {
      return this.friendSocketUser.isActive;
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
  }
}
</style>
