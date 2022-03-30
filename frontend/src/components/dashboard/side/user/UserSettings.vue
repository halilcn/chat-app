<template>
  <left-side-with-animation :enable="enableUserSettings" :toggle="toggleUserSettings" title="User Settings">
    <div class="user-settings-container">
      <div class="top-info">
        <img class="profile-image" src="https://randomuser.me/api/portraits/men/40.jpg" />
        <div class="username">halilcn</div>
      </div>
      <div class="others-info">
        <input class="item" type="text" placeholder="Name Surname" />
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

    .profile-image {
      border-radius: 100%;
      width: 100px;
      height: 100px;
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
