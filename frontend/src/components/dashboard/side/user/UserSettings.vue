<template>
  <left-side-with-animation :enable="enableUserSettings" :toggle="toggleUserSettings" title="User Settings">
    <div>burası içerik</div>
  </left-side-with-animation>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import LeftSideWithAnimation from '@/components/dashboard/side/shared/LeftSideWithAnimation';

export default {
  name: 'UserSettings',
  components: {
    LeftSideWithAnimation
  },
  methods: {
    ...mapMutations('userSetting', ['toggleUserSettings'])
  },
  computed: {
    ...mapState('userSetting', ['enableUserSettings'])
  }
};
</script>

<style lang="scss" scoped></style>
