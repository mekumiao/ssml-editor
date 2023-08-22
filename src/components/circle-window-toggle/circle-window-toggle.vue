<template>
  <div class="window-container user-select-none">
    <transition v-if="isExpanded" name="fade">
      <div class="shadow expanded-window" @click="toggleExpand">
        <span class="icon fas fa-times-circle">expanded-window</span>
      </div>
    </transition>
    <transition v-else name="expand">
      <div class="shadow small-window" @click="toggleExpand">
        <span class="icon fas fa-expand">small-window</span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isExpanded = ref(false)

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}
</script>

<style>
.window-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.expanded-window {
  width: 500px;
  height: 500px;
}

.small-window {
  width: 200px;
  height: 200px;
}

.small-window,
.expanded-window {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 50%;
  font-size: 24px;
}

.icon {
  transition: transform 1s ease-in-out;
}

.fade-enter-active,
.fade-leave-active,
.expand-enter-active,
.expand-leave-active {
  transition:
    opacity 1s,
    transform 1s;
}

.fade-enter,
.fade-leave-to,
.expand-enter,
.expand-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
