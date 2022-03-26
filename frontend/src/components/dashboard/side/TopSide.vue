<template>
  <div class="top-side-container">
    <div class="user">
      <img class="image" src="https://randomuser.me/api/portraits/men/40.jpg" />
      <div class="name">Test Soyadı</div>
    </div>
    <div class="actions">
      <i class="fa-solid fa-plus item icon"></i>
      <i class="fa-solid fa-magnifying-glass item icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopSide'
};
</script>

<style lang="scss" scoped>
.top-side-container {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;

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
    }
  }
}
</style>
