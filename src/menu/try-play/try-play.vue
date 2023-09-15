<script setup lang="ts">
import { ref, computed } from 'vue'
import TryPlayCircle from './try-play-circle.vue'
import TryPlayPanle from './try-play-panle.vue'

const circleVisible = ref(true)
const panleVisible = computed({
  get: () => !circleVisible.value,
  set: (value) => {
    circleVisible.value = !value
  },
})
</script>

<template>
  <Teleport to="body">
    <div class="ssml-editor-root">
      <TryPlayCircle v-model:visible="circleVisible"></TryPlayCircle>
      <TryPlayPanle v-model:visible="panleVisible"></TryPlayPanle>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped></style>
