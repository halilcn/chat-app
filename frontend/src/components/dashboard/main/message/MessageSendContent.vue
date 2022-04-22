<template>
  <div class="send-message-content-container">
    <div class="message-wrapper">
      <input v-model="message" class="message" type="text" placeholder="Your message..." />
      <div class="files">
        <div class="">

        </div>
      </div>
    </div>
    <div class="actions">
      <discord-picker class="item" @emoji="selectEmoji" />

      <img class="item file" src="../../../../../public/icons/attachment.png" />

      <div @click="sendMessage" class="send-message-button item">
        <i class="fa-solid fa-paper-plane"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import DiscordPicker from 'vue3-discordpicker';
import handler from '@/shared/handler';

export default {
  name: 'SendMessageContent',
  data() {
    return {
      message: {
        type: '',
        content: ''
      }
    };
  },
  components: {
    DiscordPicker
  },
  methods: {
    ...mapActions('file', ['postImage']),
    selectEmoji(emoji) {
      this.message += emoji;
    },
    sendMessage() {
      handler(async () => {
        alert();
        //await this.postImage({ image: 'ad' });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.send-message-content-container {
  margin: 10px 20px 10px 20px;
  background-color: white;
  padding: 20px;
  border-radius: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .message-wrapper {
    width: 100%;
    max-height: 300px;

    .message {
      width: 100%;
      border: 0;
      overflow-y: auto;
      color: $blue-dark;

      &::placeholder {
        color: $blue-light-dark;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    font-size: 20px;

    .item {
      margin-right: 20px;

      &.send-message-button {
        color: $default-purple;
        cursor: pointer;

        &:hover {
          color: $default-purple-hover-light;
        }
      }

      &.file {
        filter: grayscale(100%);
        width: 20px;
        height: 20px;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
          filter: grayscale(0%);
        }
      }
    }
  }
}
</style>
