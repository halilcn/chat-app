<template>
  <div class="user-action-container">
    <div class="form">
      <div class="title">Login</div>
      <div class="content">
        <div class="item">
          <input type="text" placeholder="username" />
        </div>
        <div class="item">
          <input type="password" placeholder="password" />
        </div>
        <div v-if="false" class="error">yanlı alsdsakd aslda da</div>
        <div class="action-button">login</div>
        <router-link :to="{ name: 'Register' }" class="link">
          register
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin'
};
</script>

<style lang="scss" scoped>
@include user-action-container;
</style>
