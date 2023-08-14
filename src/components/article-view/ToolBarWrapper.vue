<script setup lang="ts">
import ToolsButton from './ToolsButton.vue'
import PolyphoneMenu from '@/module/ssml/menu/PolyphoneMenu'
import ContinuousMenu from '@/module/ssml/menu/ContinuousMenu'
import SayAsMenu from '@/module/ssml/menu/SayAsMenu'
import { type SayAs } from '@/module/ssml/custom-types'

const polyphoneMenu = new PolyphoneMenu()
const continuousMenu = new ContinuousMenu()
const sayAsMenu = new SayAsMenu()

const handlePolyphone = () => {
  const editor = window.editor
  if (polyphoneMenu.isDisabled(editor)) return
  polyphoneMenu.exec(editor)
}

const handleContinuous = () => {
  const editor = window.editor
  if (continuousMenu.isDisabled(editor)) return
  continuousMenu.exec(editor)
}

const handleSayAs = (interpret: SayAs['interpret']) => {
  const editor = window.editor
  if (sayAsMenu.isDisabled(editor)) return
  sayAsMenu.exec(editor, interpret)
}
</script>

<template>
  <div class="tool-bar-wrapper">
    <div class="tool-list">
      <ToolsButton text="24K高清音质" icon="icon-play"></ToolsButton>
    </div>
    <div class="divider divider-green"></div>
    <div class="tool-list">
      <ToolsButton text="多音字" icon="icon-play" @click="handlePolyphone"></ToolsButton>
      <ToolsButton text="重音" icon="icon-play"></ToolsButton>
      <ToolsButton text="数字符号" icon="icon-play" @click="handleSayAs('digits')"></ToolsButton>
      <ToolsButton text="连读" icon="icon-play" @click="handleContinuous"></ToolsButton>
      <ToolsButton text="别名" icon="icon-play" @click="handleSayAs('characters')"></ToolsButton>
      <ToolsButton text="音标" icon="icon-play" @click="handlePolyphone"></ToolsButton>
    </div>
    <div class="divider divider-cyan"></div>
    <div class="tool-list">
      <ToolsButton text="局部变速" icon="icon-play"></ToolsButton>
      <ToolsButton text="多人配音" icon="icon-play"></ToolsButton>
      <ToolsButton text="局部变音" icon="icon-play"></ToolsButton>
    </div>
    <div class="divider divider-orange"></div>
    <div class="tool-list">
      <ToolsButton text="停顿调节" icon="icon-play"></ToolsButton>
      <ToolsButton text="插入静音" icon="icon-play"></ToolsButton>
      <!-- <ToolsButton text="符号静音" icon="icon-play"></ToolsButton>
      <ToolsButton text="段落静音" icon="icon-play"></ToolsButton>
      <ToolsButton text="解说模式" icon="icon-play"></ToolsButton> -->
    </div>
    <div class="divider divider-purple"></div>
    <div class="tool-list">
      <ToolsButton text="音效" icon="icon-play"></ToolsButton>
      <ToolsButton text="配乐" icon="icon-play"></ToolsButton>
    </div>
    <!-- <div class="divider divider-yellow"></div>
    <div class="tool-list">
      <ToolsButton text="批量替换" icon="icon-play"></ToolsButton>
      <ToolsButton text="查看拼音" icon="icon-play"></ToolsButton>
      <ToolsButton text="敏感词" icon="icon-play"></ToolsButton>
      <ToolsButton text="评论" icon="icon-play"></ToolsButton>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.tool-bar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .tool-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .divider {
    height: 50px;
    width: 3px;
    margin: 1px 14px;

    &.divider-green {
      background: var(--tool-green-border-color);
    }

    &.divider-cyan {
      background: var(--tool-cyan-color);
    }

    &.divider-orange {
      background: var(--tool-orange-color);
    }
    &.divider-purple {
      background: var(--tool-purple-color);
    }
    &.divider-yellow {
      background: var(--tool-yellow-color);
    }
  }
}
</style>
