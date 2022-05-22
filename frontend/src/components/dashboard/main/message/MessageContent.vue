<template>
  <div class="message-content-container">
    <div v-if="messages.length > 0" class="message-list" ref="headRef">
      <div
        @scroll="test"
        v-for="(message, index) in messages"
        :key="index"
        tabindex="1"
        class="message"
        :class="[isYourMessage(message.authorId) ? 'giver' : 'receiver']">
        <div class="text" v-if="isTextMessageType(message.type)">{{ message.content }}</div>
        <img
          v-else-if="isImageOfMessageFileType(message.content)"
          class="file"
          alt="message-image"
          :src="convertToFullBackendPath(message.content)"
          @click="setPathForFullScreenImage(convertToFullBackendPath(message.content))" />
        <video v-else class="file" controls>
          <source :src="convertToFullBackendPath(message.content)" type="video/mp4" />
        </video>
        <div class="time">{{ $dayjs(message.createdAt).format('DD MMM') }}</div>
      </div>
    </div>
  </div>
  <message-show-image @disable-screen="disableFullScreenImage" :path="fullScreenImagePath" />
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import helpers from '@/helpers';
import MessageShowImage from '@/components/dashboard/main/message/MessageImageFullScreen';
import { MESSAGE_TYPES, FILE_IMAGE_TYPES } from '@/store/constants';
import socketChannels from '@/store/socket-channels';

//todo: unread message'a ekranı scroll et.
//todo: isActive unedfined hatası !
export default {
  name: 'MessageContent',
  data() {
    return {
      fullScreenImagePath: null
    };
  },
  components: { MessageShowImage },
  methods: {
    ...mapMutations('message', ['setMessage', 'clearUnReadMessagesCountOnUserList']),
    ...mapActions('message', ['getMessages', 'postReadMessage']),
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
    convertToFullBackendPath(path) {
      return helpers.convertToFullBackendPath(path);
    },
    postReadMessageAction() {
      const unreadMessageIds = this.messages
        .filter(message => !message.readers.includes(this.user._id) && message.authorId !== this.user._id)
        .map(message => message._id);

      if (unreadMessageIds.length > 0) {
        this.postReadMessage(unreadMessageIds);
        this.clearUnReadMessagesCountOnUserList(this.selectedChatFriendId);
      }
    }
  },
  computed: {
    ...mapState('message', ['messages']),
    ...mapState('message', ['selectedChatFriendId']),
    ...mapState('auth', ['user'])
  },
  async created() {
    await this.getMessages();
    this.$socket.on(socketChannels.MESSAGE, message => this.setMessage(message));

    this.postReadMessageAction();
  },
  unmounted() {
    this.$socket.off(socketChannels.MESSAGE);
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
      margin: 7px 0;
      max-width: 80%;

      &:focus .time {
        display: block;
      }

      &.receiver {
        border-radius: 0 20px 20px 20px;
        background-color: white;

        .file {
          border-radius: 0 20px 20px 20px;
        }
      }

      &.giver {
        border-radius: 20px 0 20px 20px;
        align-self: flex-end;
        background-color: $default-purple;
        color: white;

        .time {
          color: white;
        }

        .file {
          border-radius: 20px 0 20px 20px;
        }
      }

      .file {
        cursor: pointer;
        aspect-ratio: 2/1;
        object-fit: cover;
        max-height: 200px;
      }

      .text {
        padding: 13px;
        font-size: 14px;
      }

      .time {
        padding: 3px 13px;
        text-align: right;
        font-size: 11px;
        font-style: italic;
        color: #5e5e5e;
        display: none;
      }
    }
  }
}
</style>
