<script setup lang="ts"></script>

<template>
  <div class="bar-wrapper-menus d-flex flex-row justify-content-center align-items-center">
    <div class="menus d-flex flex-row justify-content-center align-items-center">
      <slot></slot>
    </div>
    <div class="divider" style="height: 50px; width: 3px; margin: 1px 14px"></div>
  </div>
</template>

<style lang="scss" scoped>
$colors: var(--tool-green-border-color), var(--tool-cyan-color), var(--tool-orange-color),
  var(--tool-purple-color), var(--tool-yellow-color);

@for $i from 0 to 5 {
  .bar-wrapper-menus:nth-child(#{$i + 1}) .divider {
    background-color: nth($colors, $i + 1);
  }
}
</style>
