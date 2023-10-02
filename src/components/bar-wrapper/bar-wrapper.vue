<script setup lang="ts"></script>

<template>
  <div class="bar-wrapper">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.bar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  :deep() {
    .divider {
      height: 50px;
      width: 3px;
      margin: 1px 14px;
    }

    $colors: var(--tool-green-border-color), var(--tool-cyan-color), var(--tool-orange-color),
      var(--tool-purple-color), var(--tool-yellow-color);

    @for $i from 0 to 5 {
      .bar-wrapper-menus:nth-child(#{$i + 1}) .divider {
        background-color: nth($colors, $i + 1);
      }
    }
  }
}
</style>
