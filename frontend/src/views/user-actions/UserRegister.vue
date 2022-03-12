<template>
  <div class="user-action-container">
    <div class="form">
      <div class="title">Register</div>
      <div class="content">
        <div class="item">
          <input type="text" placeholder="name surname" />
        </div>
        <div class="item">
          <input type="text" placeholder="username" />
        </div>
        <div class="item">
          <input type="password" placeholder="password" />
        </div>
        <div v-if="false" class="error">yanlı alsdsakd aslda da</div>
        <div class="action-button loading">register</div>
        <router-link :to="{ name: 'Login' }" class="link"> login </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserRegister'
};
</script>

<style lang="scss" scoped>
@include user-action-container;
</style>
