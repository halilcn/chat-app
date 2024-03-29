<template>
  <left-side-with-animation
    data-testid="leftSide"
    class="user-friends-container"
    title="Friends"
    :toggle="toggleFriends"
    :enable="enableFriends">
    <div class="search">
      <input data-testid="searchUsername" v-model="searchUsername" placeholder="Search..." type="text" />
    </div>
    <div v-if="userList.length > 0" class="user-list">
      <div v-for="(friendUser, key) in userList" :key="key" :class="{ 'friend-item-wrapper': friendUser.isFriend }">
        <div @click="selectUserChat(friendUser)" :class="[friendUser.isFriend ? 'friend' : 'not-friend']" class="item">
          <img class="profile-image" :src="convertPath(friendUser.user.image)" />
          <div class="username">{{ friendUser.user.username }}</div>
          <div v-if="!friendUser.isFriend" @click="postFriendAction(friendUser.user._id)" class="add-btn">add</div>
        </div>
        <div v-if="friendUser.isFriend" @click="deleteFriendAction(friendUser.friendId)" class="delete-btn">
          <i class="fa-solid fa-minus"></i>
        </div>
      </div>
    </div>
    <div v-else class="user-not-found">User not found</div>
  </left-side-with-animation>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import LeftSideWithAnimation from '@/components/dashboard/side/shared/LeftSideWithAnimation';
import handler from '@/shared/handler';
import helpers from '@/helpers';

export default {
  name: 'UserFriends',
  data() {
    return {
      searchUsername: ''
    };
  },
  watch: {
    enableFriends(val) {
      if (val) this.getFriendsAction();
    },
    searchUsername(val) {
      if (val === '') {
        this.copyFriendsListToUserList();
        return;
      }

      this.searchFriendAction(val);
    }
  },
  components: {
    LeftSideWithAnimation
  },
  methods: {
    ...mapMutations('friend', ['toggleFriends', 'copyFriendsListToUserList']),
    ...mapMutations('message', ['setSelectedChatFriendId', 'deleteUserFromUserList', 'setSelectedUserId']),
    ...mapActions('friend', ['getFriends', 'postFriend', 'searchFriend', 'deleteFriend']),
    getFriendsAction() {
      handler(async () => {
        await this.getFriends();
      });
    },
    postFriendAction(userId) {
      handler(async () => {
        await this.postFriend(userId);
        this.searchUsername = '';
        this.getFriendsAction();
      });
    },
    searchFriendAction(text) {
      handler(async () => {
        await this.searchFriend(text);
      });
    },
    deleteFriendAction(friendId) {
      handler(async () => {
        await this.deleteFriend(friendId);
        this.deleteUserFromUserList(friendId);
      });
    },
    selectUserChat(friendUser) {
      this.setSelectedUserId(friendUser.user._id);
      this.setSelectedChatFriendId(friendUser.friendId);
    },
    convertPath(path) {
      if (helpers.isRemoteServerUrl(path)) return path;

      return helpers.convertToFullBackendPath(path);
    }
  },
  computed: {
    ...mapState('friend', ['enableFriends', 'userList'])
  }
};
</script>

<style lang="scss" scoped>
.user-friends-container {
  .search input {
    width: 100%;
    border: 1px solid #eaeaea;
    background-color: #fafafa;
    border-radius: 5px;
    padding: 8px 11px;
    color: #4e4e4e;
    transition: 0.2s;

    &:focus {
      transform: scale(1.02);
    }
  }

  .user-list {
    margin-top: 30px;

    .friend-item-wrapper {
      display: flex;
      align-items: center;
      width: 100%;

      .delete-btn {
        margin-left: 30px;
        margin-right: 10px;
        border-radius: 100%;
        color: #e01d1d;
        cursor: pointer;
      }
    }

    .item {
      width: 100%;
      display: flex;
      align-items: center;
      margin: 7px 0;
      border-radius: 10px;
      padding: 12px;
      transition: 0.2s;

      &.friend {
        background-color: #f8f8f8;
        cursor: pointer;

        &:hover {
          background-color: #efefef;
        }
      }

      &.not-friend {
        background-color: #f4f4ff;

        .add-btn {
          margin-left: auto;
          padding: 5px 15px;
          border-radius: 100px;
          background-color: $default-purple;
          color: white;
          cursor: pointer;

          &:hover {
            background-color: $default-purple-hover-light;
          }
        }
      }

      .profile-image {
        width: 40px;
        height: 40px;
        border-radius: 100%;
      }

      .username {
        margin-left: 25px;
        font-size: 16px;
        color: #313131;
      }
    }
  }

  .user-not-found {
    text-align: center;
    margin-top: 30px;
    color: #828282;
    font-weight: 500;
  }
}
</style>
