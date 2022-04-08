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
      <div class="item friend">
        <img class="profile-image" src="https://www.fakepersongenerator.com/Face/female/female20151024152487152.jpg" />
        <div class="username">halilcn</div>
        <div class="settings">
          <div class="btn">
            <i class="fa-solid fa-ellipsis"></i>
          </div>
          <div class="dropdown"></div>
        </div>
      </div>
    </div>
  </left-side-with-animation>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import LeftSideWithAnimation from '@/components/dashboard/side/shared/LeftSideWithAnimation';

export default {
  name: 'UserFriends',
  components: {
    LeftSideWithAnimation
  },
  methods: {
    ...mapMutations('friend', ['toggleFriends'])
  },
  computed: {
    ...mapState('friend', ['enableFriends'])
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

    .item {
      display: flex;
      align-items: center;
      margin: 18px 0;
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

      .settings {
        margin-left: auto;
        margin-bottom: auto;
      }
    }
  }
}
</style>
