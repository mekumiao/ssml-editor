<script setup lang="ts">
type DividerColor = 'green' | 'cyan' | 'orange' | 'purple' | 'yellow'

defineProps<{ divider?: DividerColor }>()
</script>

<template>
  <div class="bar-wrapper-group">
    <div class="group-items">
      <slot></slot>
    </div>
    <div class="divider" :class="[divider]"></div>
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

.bar-wrapper-group {
  .divider {
    height: 50px;
    width: 3px;
    margin: 1px 14px;

    &.green {
      background: var(--tool-green-border-color);
    }

    &.cyan {
      background: var(--tool-cyan-color);
    }

    &.orange {
      background: var(--tool-orange-color);
    }
    &.purple {
      background: var(--tool-purple-color);
    }
    &.yellow {
      background: var(--tool-yellow-color);
    }
  }
}
</style>
