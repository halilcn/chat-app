<template>
  <div class="top-side-container">
    <div @click="toggleUserSettings" class="user">
      <img class="image" :src="user.image" />
      <div class="name">{{ user.nameSurname }}</div>
    </div>
    <div class="actions">
      <i @click="toggleFriends" class="fa-solid fa-user-group item icon"></i>
      <i class="fa-solid fa-magnifying-glass item icon"></i>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'TopSide',
  methods: {
    ...mapMutations('userSetting', ['toggleUserSettings']),
    ...mapMutations('friend', ['toggleFriends'])
  },
  computed: {
    ...mapState('auth', ['user'])
  }
};
</script>

<style lang="scss" scoped>
.top-side-container {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $blue-very-light-dark;
  height: 90px;

  .user {
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      @include center-md-box-shadow;
      border-radius: 100%;
      width: 40px;
      height: 40px;
    }

    .name {
      font-size: 18px;
      margin-left: 20px;
      color: $blue-dark;
      font-weight: 500;
    }
  }

  .actions {
    display: flex;
    align-items: center;

    .item {
      padding: 5px;
      margin-left: 10px;

      &.fa-user-group {
        padding: 11px 11px 14px 12px;
      }

      &.fa-magnifying-glass {
        padding: 12px 12px 12px 12px;
      }
    }
  }
}
</style>
