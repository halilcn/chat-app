<template>
  <div class="user-action-container">
    <div class="form">
      <div class="title">Register</div>
      <div class="content">
        <div class="item">
          <input v-model="user.nameSurname" type="text" placeholder="name surname" />
        </div>
        <div class="item">
          <input v-model="user.username" type="text" placeholder="username" />
        </div>
        <div class="item">
          <input v-model="user.password" type="password" placeholder="password" />
        </div>
        <div v-if="false" class="error">yanlı alsdsakd aslda da</div>
        <div @click="postRegisterAction" class="action-button" :class="{ disable: isLoading || v$.user.$invalid }">register</div>
        <router-link :to="{ name: 'Login' }" class="link"> login </router-link>
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
  name: 'UserRegister',
  data() {
    return {
      v$: useVuelidate(),
      isLoading: false,
      user: {
        username: '',
        nameSurname: '',
        password: ''
      }
    };
  },
  validations: {
    user: {
      username: { required },
      nameSurname: { required },
      password: { required }
    }
  },
  methods: {
    ...mapActions('auth', ['postRegister']),
    async postRegisterAction() {
      await handler(
        async () => {
          this.isLoading = true;
          await this.postRegister(this.user);
        },
        err => {
          if (err.response.status === 409) {
            alert('Username already exists');
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
