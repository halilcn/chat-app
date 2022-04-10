<template>
  <left-side-with-animation class="user-friends-container" title="Friends" :toggle="toggleFriends" :enable="enableFriends">
    <div class="search">
      <input placeholder="Search..." type="text" />
    </div>
    <div class="user-list">
      <div class="item not-friend">
        <img class="profile-image" src="https://www.fakepersongenerator.com/Face/female/female20151024152487152.jpg" />
        <div class="username">halilcn</div>
        <div class="add-btn">add</div>
      </div>
      <div v-for="(friend, key) in friendsList" :key="key" class="friend-item-wrapper">
        <div @click="selectUserChat(friend._id)" class="item friend">
          <img class="profile-image" :src="friend.user.image" />
          <div class="username">{{ friend.user.username }}</div>
        </div>
        <div @click="deleteUserAction(friend._id)" class="delete-btn">
          <i class="fa-solid fa-minus"></i>
        </div>
      </div>
    </div>
  </left-side-with-animation>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import LeftSideWithAnimation from '@/components/dashboard/side/shared/LeftSideWithAnimation';

export default {
  name: 'UserFriends',
  components: {
    LeftSideWithAnimation
  },
  watch: {
    enableFriends(val) {
      if (val) this.getFriends();
    }
  },
  methods: {
    ...mapMutations('friend', ['toggleFriends']),
    ...mapActions('friend', ['getFriends']),
    selectUserChat(friendId) {
      alert('selec chat');
    },
    deleteUserAction(friendId) {
      alert('delet user');
    }
  },
  computed: {
    ...mapState('friend', ['enableFriends', 'friendsList', 'searchFriendList'])
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
      margin: 12px 0;
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
}
</style>
