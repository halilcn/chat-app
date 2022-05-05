<template>
  <div class="top-content-container">
    <img class="profile-image" :src="friendUser.image" />
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
</template>

<script>
import { mapActions, mapState } from 'vuex';

import handler from '@/shared/handler';
import socketChannels from '@/store/socket-channels';
import helpers from '@/helpers';

//todo: db'den last active verisinide döndür ?
//todo: convert backend path işlemi yapcak mıyız ? Değişim yapılmalı mıdır ?
//todo: socket'ten gelen last active tarihi ?
//todo:socket'te user id, sende friend id ?
export default {
  name: 'TopContent',
  data() {
    return {
      friendUser: {},
      userIdsInWritingStatus: [],
      friendSocketUser: {}
    };
  },
  methods: {
    ...mapActions('friend', ['getFriend']),
    getFriendAction() {
      handler(async () => {
        this.friendUser = await this.getFriend(this.selectedChatFriendId);
      });
    },
    convertPath(path) {
      return helpers.convertToFullBackendPath(path);
    }
  },
  created() {
    this.getFriendAction();

    this.$socket.on(socketChannels.USER_IN_WRITING_STATUS, payload => this.userIdsInWritingStatus.push(payload));
    this.$socket.on(
      socketChannels.USER_IN_NOT_WRITING_STATUS,
      payload => (this.userIdsInWritingStatus = this.userIdsInWritingStatus.filter(userId => userId !== payload))
    );
    this.$socket.on(
      socketChannels.ACTIVE_USERS,
      activeUsers => (this.friendSocketUser = activeUsers.find(user => user._id === 'user id gelecek !'))
    );
  },
  computed: {
    ...mapState('message', ['selectedChatFriendId']),
    ...mapState('auth', ['user']),
    isWriting() {
      return this.userIdsInWritingStatus.filter(userId => userId !== this.user._id).length > 0;
    },
    isActive() {
      console.log(this.friendSocketUser);
      return false;
    }
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
