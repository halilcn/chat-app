<template>
  <div class="top-content-container">
    <img class="profile-image" src="https://randomuser.me/api/portraits/men/40.jpg" />
    <div class="user-info">
      <div class="name">Halil Can</div>
      <div class="last-active">active - bugün 12:40 - yazıyor</div>
    </div>
    <div class="actions">
      <i class="fa-solid fa-ellipsis-vertical icon item"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopContent'
};
</script>

<style lang="scss" scoped>
.top-content-container {
  height: 90px;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid $blue-very-light-dark;

  .profile-image {
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;

    .name {
      font-size: 19px;
    }

    .last-active {
      font-size: 15px;
      margin-top: 3px;
      color: $blue-light-dark;
    }
  }

  .actions {
    margin-left: auto;

    .item {
      &.fa-ellipsis-vertical {
        padding: 11px 18px 12px 18px;
      }
    }
  }
}
</style>
