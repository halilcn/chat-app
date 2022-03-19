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
        <div @click="postRegisterAction" class="action-button">register</div>
        <router-link :to="{ name: 'Login' }" class="link"> login </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import handler from '@/shared/handler';

export default {
  name: 'UserRegister',
  methods: {
    ...mapActions('auth', ['postRegister']),
    async postRegisterAction() {
      await handler(
        async () => {
          await this.postRegister({ username: 'tesasddat', nameSurname: 'ha', password: 'test' });
        },
        err => {
          if (err.response.status === 409) {
            alert('Kullanıcı adı zaten var');
            return true;
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@include user-action-container;
</style>
