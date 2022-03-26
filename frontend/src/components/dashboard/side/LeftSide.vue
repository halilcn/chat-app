<template>
  <div class="left-side-container">
    <user-settings />
    <top-side class="content" />
    <user-list class="content" />
  </div>
</template>

<script>
import UserSettings from '@/components/dashboard/side/user/UserSettings';
import TopSide from '@/components/dashboard/side/TopSide';
import UserList from '@/components/dashboard/side/UserList';

export default {
  name: 'LeftContent',
  components: {
    TopSide,
    UserList,
    UserSettings
  }
};
</script>

<style lang="scss" scoped>
.left-side-container {
  position: relative;
  width: 650px;
  background-color: white;

  .content {
    padding: 20px;
  }
}
</style>
