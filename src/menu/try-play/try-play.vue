<script setup lang="ts">
import { ref } from 'vue'
import TryPlayCircle from './try-play-circle.vue'
import TryPlayPanle from './try-play-panle.vue'

const circleVisible = ref(true)

function handlePanleVisible(value: boolean) {
  if (!value) {
    circleVisible.value = true
  }
}
</script>

<template>
  <Teleport to="body">
    <TryPlayCircle v-model:visible="circleVisible"> </TryPlayCircle>
    <TryPlayPanle :visible="!circleVisible" @update:visible="handlePanleVisible"></TryPlayPanle>
  </Teleport>
</template>

<style lang="scss" scoped></style>
