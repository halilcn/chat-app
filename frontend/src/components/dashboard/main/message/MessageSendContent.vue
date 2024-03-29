<template>
  <div class="send-message-content-container">
    <div class="message-wrapper">
      <div v-if="isMessageFileType(message.type)" class="files">
        <div v-for="(file, index) in message.content" :key="index" @click="deleteFile(index)" class="file">{{ file.name }}</div>
      </div>
      <input
        v-else
        ref="messageInput"
        v-on:keyup.enter="sendMessage"
        @keyup="setTextTypeMessage"
        :value="message.content"
        class="message"
        type="text"
        placeholder="Your message..." />
    </div>
    <div class="actions">
      <discord-picker v-if="!isMessageFileType(message.type)" class="item icons" @emoji="selectEmoji" />
      <div class="item message-file">
        <input @change="uploadImage" type="file" id="message_file" multiple />
        <label for="message_file">
          <img class="item file" src="../../../../../public/icons/attachment.png" />
        </label>
      </div>
      <div @click="sendMessage" class="send-message-button item">
        <i class="fa-solid fa-paper-plane"></i>
      </div>
    </div>
    <div v-if="messageLength === 0" @click="sendFirstMessage" class="no-message">
      <i class="fa-solid fa-hand"></i>
      Say hi
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import DiscordPicker from 'vue3-discordpicker';

import handler from '@/shared/handler';
import { MESSAGE_TYPES, FILE_VIDEO_TYPES, FILE_IMAGE_TYPES } from '@/store/constants';
import socketActions from '@/store/socket-actions';

export default {
  name: 'SendMessageContent',
  data() {
    return {
      message: {
        type: '',
        content: ''
      },
      clearTimeoutForTyping: null
    };
  },
  components: {
    DiscordPicker
  },
  methods: {
    ...mapActions('file', ['postFile']),
    ...mapActions('message', ['postMessage', 'getUserListMessages']),
    selectEmoji(emoji) {
      this.message.content += emoji;
      this.selectTextMessageType();

      this.$refs.messageInput.focus();
    },
    async sendMessage() {
      await handler(async () => {
        if (!this.message.content) return;
        if (this.message.type === MESSAGE_TYPES.FILE) await this.postFileForMessageFileType();

        if (!Array.isArray(this.message)) this.message = [this.message];
        await this.postMessage(this.message);
        socketActions.sendMessage(this.$socket, {
          toUserId: this.selectedUserId,
          messages: this.message,
          friendId: this.selectedChatFriendId
        });

        this.clearMessage();
      });
    },
    async postFileForMessageFileType() {
      await handler(async () => {
        const newMessage = [];

        for (const file of this.message.content) {
          const filePath = await this.postFile({ file });
          newMessage.push({ type: 'file', content: filePath });
        }

        this.message = newMessage;
      });
    },
    clearMessage() {
      this.message = {
        type: MESSAGE_TYPES.TEXT,
        content: ''
      };
    },
    selectFileMessageType() {
      this.message.type = MESSAGE_TYPES.FILE;
    },
    selectTextMessageType() {
      this.message.type = MESSAGE_TYPES.TEXT;
    },
    setTextTypeMessage(e) {
      this.typing();

      this.message.content = e.target.value;
      this.selectTextMessageType();
    },
    typing() {
      clearTimeout(this.clearTimeoutForTyping);
      const payload = {
        friendId: this.selectedChatFriendId,
        userId: this.user._id
      };

      if (!this.clearTimeoutForTyping) socketActions.startTyping(this.$socket, payload);

      this.clearTimeoutForTyping = setTimeout(() => {
        socketActions.leavingTyping(this.$socket, payload);
        this.clearTimeoutForTyping = null;
      }, 1000);
    },
    uploadImage(e) {
      const messageFileContents = Object.values(e.target.files).filter(file =>
        [...FILE_VIDEO_TYPES, ...FILE_IMAGE_TYPES].includes(file.type)
      );
      if (messageFileContents.length === 0) return;
      this.message.content = messageFileContents;
      this.selectFileMessageType();
    },
    isMessageFileType(type) {
      return MESSAGE_TYPES.FILE === type;
    },
    deleteFile(fileIndex) {
      this.message.content = this.message.content.filter((file, index) => index !== fileIndex);
      if (this.message.content.length === 0) {
        this.clearMessage();
      }
    },
    async sendFirstMessage() {
      this.setTextTypeMessage({ target: { value: 'Hi!' } });
      await this.sendMessage();
      await this.getUserListMessages();
    }
  },
  computed: {
    ...mapState('message', ['selectedChatFriendId', 'selectedUserId']),
    ...mapState('auth', ['user']),
    ...mapGetters('message', ['messageLength'])
  },
  created() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.messageInput.focus();
      }, 100);
    });
  }
};
</script>

<style lang="scss" scoped>
.send-message-content-container {
  position: relative;
  margin: 10px 20px 10px 20px;
  background-color: white;
  padding: 10px 20px;
  border-radius: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .message-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    overflow-y: auto;
    height: 60px;
    max-height: 90px;

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

      &.icons {
        margin-bottom: 1rem;
      }
    }
  }

  .no-message {
    position: absolute;
    cursor: pointer;
    background-color: $blue-very-light-dark;
    color: $blue-dark;
    padding: 12px 30px;
    border-radius: 100px;
    font-size: 14px;
    left: 0;
    bottom: 120px;

    &:hover {
      background-color: #d6d8dc;
    }
  }
}
</style>
