<template>
  <div class="dashboard-container">
    <left-side/>
    <main-content/>
  </div>
</template>

<script>
import LeftSide from '@/components/dashboard/side/LeftSide.vue';
import MainContent from '@/components/dashboard/main/MainContent.vue';

export default {
  name: 'UserDashboard',
  components: {
    LeftSide,
    MainContent
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container{
  height: 100%;
  display: flex;
}
</style>
