<script setup lang="ts"></script>

<template>
  <div class="bar-wrapper-group">
    <div class="group-items">
      <slot></slot>
    </div>
    <div class="divider"></div>
  </div>
</template>

<style lang="scss" scoped>
.bar-wrapper-group,
.group-items {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
