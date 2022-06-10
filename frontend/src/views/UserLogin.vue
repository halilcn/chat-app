<template>
  <div class="user-action-container">
    <div class="form">
      <div class="title">Login</div>
      <div class="content">
        <div class="item">
          <input data-testid="username" v-model="user.username" type="text" placeholder="username" />
        </div>
        <div class="item">
          <input data-testid="password" v-model="user.password" type="password" placeholder="password" />
        </div>
        <div data-testid="wrongError" v-if="usernameOrPasswordWrong" class="error">Username or password wrong.</div>
        <div data-testid="loginButton" class="action-button" :class="{ disable: isLoading || v$.user.$invalid }" @click="postLoginAction">
          login
        </div>
        <router-link :to="{ name: 'Register' }" class="link"> register </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import handler from '@/shared/handler';

export default {
  name: 'UserLogin',
  data() {
    return {
      v$: useVuelidate(),
      isLoading: false,
      usernameOrPasswordWrong: false,
      user: {
        username: '',
        password: ''
      }
    };
  },
  validations: {
    user: {
      username: { required },
      password: { required }
    }
  },
  methods: {
    ...mapActions('auth', ['postLogin']),
    async postLoginAction() {
      await handler(
        async () => {
          this.isLoading = true;
          await this.postLogin(this.user);
        },
        err => {
          if (err.response.status === 401) {
            this.usernameOrPasswordWrong = true;
            return true;
          }
        }
      ).finally(() => {
        this.isLoading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@include user-action-container;
</style>
