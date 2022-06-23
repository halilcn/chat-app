<template>
  <div class="left-side-container">
    <user-settings data-testid="userSettings"/>
    <user-friends data-testid="userFriends"/>
    <top-side data-testid="topSide" class="content" />
    <user-list data-testid="userList" class="content" />
  </div>
</template>

<script>
import UserSettings from '@/components/dashboard/side/user/UserSettings';
import UserFriends from '@/components/dashboard/side/user/UserFriends';
import TopSide from '@/components/dashboard/side/TopSide';
import UserList from '@/components/dashboard/side/user/UserList';

export default {
  name: 'LeftContent',
  components: {
    TopSide,
    UserList,
    UserSettings,
    UserFriends
  }
};
</script>

<style lang="scss" scoped>
.left-side-container {
  position: relative;
  width: 650px;
  background-color: white;
  border-right: 1px solid $blue-very-light-dark;

  .content {
    padding: 20px;
  }
}
</style>
