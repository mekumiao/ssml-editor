<script setup lang="ts">
import {
  BarButton,
  SpeakerMenu,
  ReadMenu,
  DigitalMenu,
  ContinuousMenu,
  AliasMenu,
  EnglishMenu,
  ChangespeedMenu,
  RhythmMenu,
  SpecialMenu,
  MuteMenu,
  BgmMenu,
  type IdText
} from '@/index'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

function handleError(error: string) {
  ElMessage.warning({
    message: error,
    grouping: true
  })
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

const sceneOptions = ref([
  { value: '', label: '全部场景' },
  { value: '2', label: '场景2' },
  { value: '3', label: '场景3' }
])

const styleOptions = ref([
  { value: '', label: '全部风格' },
  { value: '2', label: '风格2' },
  { value: '3', label: '风格3' }
])

function fetchSpecial(filter: {
  search: string
  menuKey: 'first' | 'second' | 'last'
  scene: string
  style: string
}): Promise<{ value: string; label: string }[]> {
  return Promise.resolve([
    { value: '1', label: `${filter.search || '测试'}音效1` },
    { value: '2', label: `${filter.menuKey || '测试'}音效2` },
    { value: '3', label: `${filter.scene || '测试'}音效3` },
    { value: '4', label: `${filter.style || '测试'}音效4` }
  ])
}

function fetchBgm(filter: {
  search: string
  menuKey: 'first' | 'second' | 'last'
  scene: string
  style: string
}): Promise<{ value: string; label: string }[]> {
  return Promise.resolve([
    { value: '1', label: `${filter.search || '测试'}背景音乐1` },
    { value: '2', label: `${filter.menuKey || '测试'}背景音乐2` },
    { value: '3', label: `${filter.scene || '测试'}背景音乐3` },
    { value: '4', label: `${filter.style || '测试'}背景音乐4` }
  ])
}
</script>

<template>
  <div class="edit-bar-wrapper">
    <div class="tool-list">
      <BarButton text="24K高清音质" icon="play" disabled></BarButton>
    </div>
    <div class="divider divider-green"></div>
    <div class="tool-list">
      <SpeakerMenu @error="handleError" :fetch="fetchSpeaker"></SpeakerMenu>
      <ReadMenu @error="handleError"></ReadMenu>
      <DigitalMenu @error="handleError"></DigitalMenu>
      <ContinuousMenu @error="handleError"></ContinuousMenu>
      <AliasMenu @error="handleError"></AliasMenu>
      <EnglishMenu :fetch="fetchEnglish" @error="handleError"></EnglishMenu>
    </div>
    <div class="divider divider-cyan"></div>
    <div class="tool-list">
      <ChangespeedMenu @error="handleError"></ChangespeedMenu>
      <BarButton text="多人配音" icon="management" disabled></BarButton>
      <BarButton text="局部变音" icon="conversion" disabled></BarButton>
    </div>
    <div class="divider divider-orange"></div>
    <div class="tool-list">
      <RhythmMenu @error="handleError"></RhythmMenu>
      <MuteMenu @error="handleError"></MuteMenu>
    </div>
    <div class="divider divider-purple"></div>
    <div class="tool-list">
      <SpecialMenu
        @error="handleError"
        :fetch="fetchSpecial"
        :scenes="sceneOptions"
        :styles="styleOptions"
      ></SpecialMenu>
      <BgmMenu
        @error="handleError"
        :fetch="fetchBgm"
        :scenes="sceneOptions"
        :styles="styleOptions"
      ></BgmMenu>
    </div>
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
