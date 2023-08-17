<script setup lang="ts">
import {
  SpeakerMenu,
  ReadMenu,
  DigitalMenu,
  ContinuousMenu,
  AliasMenu,
  EnglishMenu,
  ChangespeedMenu,
  RhythmMenu,
  type IdText
} from '@/index'
import { ElMessage, ElPopover } from 'element-plus'
import EditInput from './EditInput.vue'

function handleError(error: string) {
  ElMessage.warning(error)
}

function fetchSpeaker(hanzi: string): Promise<IdText[]> {
  const list = {
    我: [
      { id: '1', text: 'wo1', remark: 'wo1' },
      { id: '2', text: 'wo2', remark: 'wo2' },
      { id: '3', text: 'wo3', remark: 'wo3' }
    ],
    的: [
      { id: '1', text: 'de1', remark: 'de1' },
      { id: '2', text: 'de2', remark: 'de2' },
      { id: '3', text: 'de3', remark: 'de3' }
    ]
  } as Record<string, IdText[]>
  return Promise.resolve(list[hanzi] || list['的'])
}

function fetchEnglish(word: string): Promise<IdText[]> {
  const list = {
    translate: [{ id: '1', text: 'wərd', remark: 'wərd' }],
    global: [{ id: '2', text: 'ˈɡlōbəl', remark: 'ˈɡlōbəl' }]
  } as Record<string, IdText[]>
  return Promise.resolve(list[word] || list['translate'])
}
</script>

<template>
  <div class="edit-bar-wrapper">
    <div class="tool-list">
      <EditBarButton text="24K高清音质" icon="play" disabled></EditBarButton>
    </div>
    <div class="divider divider-green"></div>
    <div class="tool-list">
      <SpeakerMenu :popover="ElPopover" @error="handleError" :fetch="fetchSpeaker"></SpeakerMenu>
      <ReadMenu :popover="ElPopover" @error="handleError"></ReadMenu>
      <DigitalMenu :popover="ElPopover" @error="handleError"></DigitalMenu>
      <ContinuousMenu @error="handleError"></ContinuousMenu>
      <AliasMenu :popover="ElPopover" :input="EditInput"></AliasMenu>
      <EnglishMenu :popover="ElPopover" :fetch="fetchEnglish"></EnglishMenu>
    </div>
    <div class="divider divider-cyan"></div>
    <div class="tool-list">
      <ChangespeedMenu :popover="ElPopover"></ChangespeedMenu>
      <EditBarButton text="多人配音" icon="management" disabled></EditBarButton>
      <EditBarButton text="局部变音" icon="conversion" disabled></EditBarButton>
    </div>
    <div class="divider divider-orange"></div>
    <div class="tool-list">
      <RhythmMenu :popover="ElPopover"></RhythmMenu>
      <EditBarButton text="插入静音" icon="mute" disabled></EditBarButton>
      <EditBarButton text="符号静音" icon="symbol" disabled></EditBarButton>
      <!-- <EditBarButton text="段落静音" icon="icon-play" disabled></EditBarButton>
      <EditBarButton text="解说模式" icon="icon-play" disabled></EditBarButton> -->
    </div>
    <div class="divider divider-purple"></div>
    <div class="tool-list">
      <EditBarButton text="音效" icon="special" disabled></EditBarButton>
      <EditBarButton text="配乐" icon="bgm" disabled></EditBarButton>
    </div>
    <!-- <div class="divider divider-yellow"></div>
    <div class="tool-list">
      <EditBarButton text="批量替换" icon="icon-play"></EditBarButton>
      <EditBarButton text="查看拼音" icon="icon-play"></EditBarButton>
      <EditBarButton text="敏感词" icon="icon-play"></EditBarButton>
      <EditBarButton text="评论" icon="icon-play"></EditBarButton>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.edit-bar-wrapper {
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
