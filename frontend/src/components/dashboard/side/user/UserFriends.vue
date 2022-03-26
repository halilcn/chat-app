<template>
  <left-side-with-animation title="Friends" :toggle="toggleFriends" :enable="enableFriends"> test </left-side-with-animation>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import LeftSideWithAnimation from '@/components/dashboard/side/shared/LeftSideWithAnimation';

export default {
  name: 'UserFriends',
  components: {
    LeftSideWithAnimation
  },
  methods: {
    ...mapMutations('friend', ['toggleFriends'])
  },
  computed: {
    ...mapState('friend', ['enableFriends'])
  }
};
</script>

<style scoped></style>
