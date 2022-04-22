<template>
  <div class="send-message-content-container">
    <div class="message-wrapper">
      <input @keyup="setTextTypeMessage" class="message" type="text" placeholder="Your message..." />
      <!--<div class="files">
        <div class="file">asdsaasdadsa.png</div>
        <div class="file">asdsaasdadsa.png</div>
        <div class="file">asdsaasdadsa.png</div>
        <div class="file">adsa.png</div>
        <div class="file">adsa.png</div>
        <div class="file">asdsaasdadsa_asdada2_ads.png</div>
      </div> -->
    </div>
    <div class="actions">
      <discord-picker class="item" @emoji="selectEmoji" />
      <div v-if="message.type === MESSAGE_TYPES.FILE" class="item message-file">
        <input @change="uploadImage" type="file" id="message_file" multiple />
        <label for="message_file">
          <img class="item file" src="../../../../../public/icons/attachment.png" />
        </label>
      </div>
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
import { MESSAGE_TYPES } from '@/store/constants';

//todo:message array ile çoklu gönderildiğinde store etmek
//todo:video store için api

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
  watch: {
    message: {
      deep: true,
      handler(message) {
        console.log(message);
      }
    }
  },
  methods: {
    ...mapActions('file', ['postImage']),
    selectEmoji(emoji) {
      this.message += emoji;
    },
    sendMessage() {
      handler(async () => {
        console.log(this.message);
        //await this.postImage({ image: 'ad' });
      });
    },
    setTextTypeMessage(e) {
      this.message.content = e.target.value;
      this.message.type = MESSAGE_TYPES.TEXT;
    },
    uploadImage(e) {
      this.message.content = e.target.files;
      this.message.type = MESSAGE_TYPES.FILE;
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
    max-height: 90px;
    overflow-y: auto;

    .message {
      width: 100%;
      border: 0;
      color: $blue-dark;

      &::placeholder {
        color: $blue-light-dark;
      }
    }

    .files {
      display: flex;
      flex-wrap: wrap;

      .file {
        @include text-max-length(200);
        cursor: pointer;
        padding: 5px 15px;
        border-radius: 10px;
        background-color: #f1f1f1;
        font-weight: 300;
        font-size: 14px;
        margin: 7px;

        &:hover {
          background-color: #fff3f3;
        }
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    font-size: 20px;

    .item {
      margin-right: 20px;

      &.message-file {
        input {
          display: none;
        }
      }

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
