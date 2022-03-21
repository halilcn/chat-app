<template>
  <div class="left-side-container">
    <top-side />
  </div>
</template>

<script>
import TopSide from '@/components/dashboard/side/TopSide';

export default {
  name: 'LeftContent',
  components: {
    TopSide
  }
};
</script>

<style lang="scss" scoped>
.left-side-container {
  width: 600px;
  background-color: white;
}
</style>
