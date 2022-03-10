<template>
  <div class="test">sdf sfsd sdf</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  }
});
</script>

<style scoped lang="scss">
.test {
  background-color: $test-c;
}
</style>
