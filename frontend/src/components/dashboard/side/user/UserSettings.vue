<template>
  <left-side-with-animation :enable="enableUserSettings" :toggle="toggleUserSettings" title="User Settings">
    <div class="user-settings-container">
      <div class="top-info">
        <div class="profile-image-wrapper">
          <input @change="onChangeUserImageFile" type="file" id="profile_image" />
          <label class="change-profile-image" for="profile_image"> </label>
          <img class="profile-image" :src="userImage" />
        </div>
        <div class="username">{{ userSettings.username }}</div>
      </div>
      <div class="others-info">
        <input class="item" type="text" placeholder="Name Surname" v-model="userSettings.nameSurname" />
      </div>
      <div class="save-button" :class="{ disable: isLoading || v$.userSettings.$invalid }" @click="postUserSettingsAction">Save</div>
    </div>
  </left-side-with-animation>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import LeftSideWithAnimation from '@/components/dashboard/side/shared/LeftSideWithAnimation';
import handler from '@/shared/handler';

export default {
  name: 'UserSettings',
  data() {
    return {
      v$: useVuelidate(),
      userSettings: {},
      isLoading: false,
      temporaryUserImageUrl: null
    };
  },
  validations: {
    userSettings: {
      nameSurname: { required }
    }
  },
  watch: {
    enableUserSettings(val) {
      if (val) this.userSettings = { ...this.user };
    }
  },
  components: {
    LeftSideWithAnimation
  },
  methods: {
    ...mapMutations('userSetting', ['toggleUserSettings']),
    ...mapActions('userSetting', ['postUserSettings']),
    onChangeUserImageFile(event) {
      this.userSettings.image = event.target.files[0];
      this.temporaryUserImageUrl = URL.createObjectURL(this.userSettings.image);
    },
    postUserSettingsAction() {
      handler(async () => {
        this.isLoading = true;
        await this.postUserSettings(this.userSettings);
      }).finally(() => {
        this.isLoading = false;
      });
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('userSetting', ['enableUserSettings']),
    userImage() {
      return this.temporaryUserImageUrl ? this.temporaryUserImageUrl : this.user.image;
    }
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

      &:hover .change-profile-image {
        opacity: 0.3;
      }

      input {
        display: none;
      }

      .change-profile-image {
        position: absolute;
        border-radius: 100%;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0;
        transition: 0.2s;
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

    &.disable {
      background: #d7d7d7;
      color: #adadad;
      pointer-events: none;
    }
  }
}
</style>
