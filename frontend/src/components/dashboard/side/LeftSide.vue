<template>
  <div class="left-side-container">
    <top-side  class="content"/>
    <user-list class="content"/>
  </div>
</template>

<script>
import TopSide from '@/components/dashboard/side/TopSide';
import UserList from '@/components/dashboard/side/UserList';

export default {
  name: 'LeftContent',
  components: {
    TopSide,
    UserList
  }
};
</script>

<style lang="scss" scoped>
.left-side-container {
  width: 600px;
  background-color: white;

  .content{
    padding: 20px;
  }
}
</style>
