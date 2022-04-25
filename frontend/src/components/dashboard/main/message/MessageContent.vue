<template>
  <div class="message-content-container">
    <div v-if="messages.length > 0" class="message-list">
      <div
        v-for="(message, index) in messages"
        :key="index"
        tabindex="1"
        class="message file"
        :class="[isYourMessage(message.authorId) ? 'giver' : 'receiver']">
        <span v-if="isTextMessageType(message.type)">{{ message.content }}</span>
        <span v-else>
          <img
            v-if="isImageOfMessageFileType(message.content)"
            :src="convertToFullBackendPath(message.content)"
            @click="setPathForFullScreenImage(convertToFullBackendPath(message.content))" />
          <video v-else width="320" height="240" controls>
            <source :src="convertToFullBackendPath(message.content)" type="video/mp4" />
          </video>
        </span>
        <div class="time">{{ message.createdAt }}</div>
      </div>
    </div>
    <div v-else class="no-message">
      <i class="fa-solid fa-hand"></i>
      Say hi
    </div>
  </div>
  <message-show-image @disable-screen="disableFullScreenImage" :path="fullScreenImagePath" />
</template>

<script>
//import { io } from 'socket.io-client';
import { mapState } from 'vuex';

import helpers from '@/helpers';
import MessageShowImage from '@/components/dashboard/main/message/MessageImageFullScreen';
import { MESSAGE_TYPES, FILE_IMAGE_TYPES } from '@/store/constants';

//todo:message type !
export default {
  name: 'MessageContent',
  data() {
    return {
      fullScreenImagePath: null
      /* socket: io(' http://localhost:3000')*/
    };
  },
  components: { MessageShowImage },
  methods: {
    setPathForFullScreenImage(path) {
      this.fullScreenImagePath = path;
    },
    disableFullScreenImage() {
      this.fullScreenImagePath = null;
    },
    isYourMessage(authorId) {
      return this.user._id === authorId;
    },
    isTextMessageType(type) {
      return MESSAGE_TYPES.TEXT === type;
    },
    isImageOfMessageFileType(content) {
      const arrayContent = content.split('.');
      const fileExtension = arrayContent[arrayContent.length - 1];
      const fileImageTypeExtensions = FILE_IMAGE_TYPES.map(file => file.split('/')[1]);

      return fileImageTypeExtensions.includes(fileExtension);
    },
    convertToFullBackendPath(st) {
      //todo:!!!
      return helpers.convertToFullBackendPath(st);
    },
    test() {
      /*  this.socket.emit('SEND_MESSAGE', {
        user: 'test',
        message: 'asdsads'
      });*/
    }
  },
  mounted() {
    /*   this.socket.on('MESSAGE', data => {
      console.log('socket geldi !!!');
      console.log(data);
    });*/
  },
  computed: {
    ...mapState('message', ['messages']),
    ...mapState('auth', ['user'])
  }
};
</script>

<style lang="scss" scoped>
.message-content-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .message-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    position: relative;
    overflow: auto;
    min-height: 100%;
    height: 100px;

    .message {
      padding: 13px;
      margin: 7px 0;
      max-width: 80%;

      &:focus .time {
        display: block;
      }

      &.receiver {
        border-radius: 0 20px 20px 20px;
      }

      &.giver {
        border-radius: 20px 0 20px 20px;
        align-self: flex-end;
        background-color: $default-purple;
        color: white;

        .time {
          color: white;
        }
      }

      &.file {
        padding: 0;
        cursor: pointer;

        img,
        video {
          aspect-ratio: 2/1;
          object-fit: cover;
          max-height: 200px;
          border-radius: 20px;
        }
      }

      .time {
        text-align: right;
        font-size: 11px;
        color: #5e5e5e;
        margin-top: 5px;
        display: none;
      }

      .text {
        font-size: 14px;
        background-color: white;
      }
    }
  }

  .no-message {
    cursor: pointer;
    margin: auto 30px 30px 30px;
    align-self: flex-start;
    background-color: $blue-very-light-dark;
    color: $blue-dark;
    padding: 12px 30px;
    border-radius: 100px;
    font-size: 14px;
  }
}
</style>
