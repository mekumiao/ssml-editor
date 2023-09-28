<script setup lang="ts"></script>

<template>
  <div class="bar-wrapper-menus">
    <div class="menus">
      <slot></slot>
    </div>
    <div class="divider"></div>
  </div>
</template>

<style lang="scss" scoped>
.bar-wrapper-menus,
.menus {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
