<template>
  <left-side-with-animation :enable="enableUserSettings" :toggle="toggleUserSettings" title="User Settings">
    <div class="user-settings-container">
      <div class="top-info">
        <div class="profile-image-wrapper">
          <input type="file" id="profile_image" />
          <label class='change-profile-image' for="profile_image">
          </label>
          <img class="profile-image" :src="user.image" />
        </div>
        <div class="username">{{ user.username }}</div>
      </div>
      <div class="others-info">
        <input class="item" type="text" placeholder="Name Surname" value="" />
      </div>
      <div class="save-button">Save</div>
    </div>
  </left-side-with-animation>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import LeftSideWithAnimation from '@/components/dashboard/side/shared/LeftSideWithAnimation';

export default {
  name: 'UserSettings',
  components: {
    LeftSideWithAnimation
  },
  methods: {
    ...mapMutations('userSetting', ['toggleUserSettings'])
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('userSetting', ['enableUserSettings'])
  }
};
</script>

<style lang="scss" scoped>
.user-settings-container {
  display: flex;
  flex-direction: column;

  .top-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    .profile-image-wrapper {
      position: relative;
      border-radius: 100%;

      &:hover .change-profile-image{
        opacity: .3;
      }

      input{
        display: none;
      }

      .change-profile-image{
        position: absolute;
        border-radius: 100%;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0;
        transition: .2s;
        cursor: pointer;
      }

      .profile-image {
        width: 100px;
        height: 100px;
        border-radius: 100%;
      }
    }

    .username {
      margin-top: 12px;
      font-size: 17px;
      color: $blue-dark;
    }
  }

  .others-info {
    margin-top: 20px;

    .item {
      width: 100%;
      padding: 12px;
      border: 1px solid #d4d4d4;
      color: #4e4e4e;
      border-radius: 5px;
      transition: 0.2s;

      &:focus {
        @include center-lg-box-shadow;
      }
    }
  }

  .save-button {
    margin-top: 30px;
    margin-left: auto;
    padding: 9px 20px;
    border-radius: 8px;
    color: $blue-dark;
    background-color: $blue-very-light-dark;
    cursor: pointer;

    &:hover {
      background-color: #dce0e8;
    }
  }
}
</style>
