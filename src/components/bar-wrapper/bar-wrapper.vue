<script setup lang="ts"></script>

<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
