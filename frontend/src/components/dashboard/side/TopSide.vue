<template>
  <div class="top-side-container">
    <div class="user">
      <img class="image" src="https://randomuser.me/api/portraits/men/40.jpg" />
      <div class="name">Test Soyadı</div>
    </div>
    <div class="actions">
      <i class="fa-solid fa-plus icon"></i>
     <i class="fa-solid fa-magnifying-glass icon"></i>
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
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;


  .user {
    display: flex;
    align-items: center;

    img {
      border-radius: 100%;
      width: 40px;
      height: 40px;
    }

    .name{
      margin-left: 20px;
    }
  }

  .actions{
    display: flex;
    align-items: center;
  }
}
</style>
