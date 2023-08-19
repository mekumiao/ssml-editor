<script setup lang="ts">
import { BarWrapper, BarWrapperGroup, BarButton } from '../components'
import {
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
  BgmMenu
} from '../menu'

import { type IdText } from '../core'
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
    {
      value: 'https://download.samplelib.com/wav/sample-3s.wav#1',
      label: `${filter.search || '测试'}音效1`
    },
    {
      value: 'https://download.samplelib.com/wav/sample-3s.wav#2',
      label: `${filter.menuKey || '测试'}音效2`
    },
    {
      value: 'https://download.samplelib.com/wav/sample-3s.wav#3',
      label: `${filter.scene || '测试'}音效3`
    },
    {
      value: 'https://download.samplelib.com/wav/sample-3s.wav#4',
      label: `${filter.style || '测试'}音效4`
    }
  ])
}

function fetchBgm(filter: {
  search: string
  menuKey: 'first' | 'second' | 'last'
  scene: string
  style: string
}): Promise<{ value: string; label: string }[]> {
  return Promise.resolve([
    {
      value: 'https://download.samplelib.com/wav/sample-6s.wav#1',
      label: `${filter.search || '测试'}背景音乐1`
    },
    {
      value: 'https://download.samplelib.com/wav/sample-6s.wav#2',
      label: `${filter.menuKey || '测试'}背景音乐2`
    },
    {
      value: 'https://download.samplelib.com/wav/sample-6s.wav#3',
      label: `${filter.scene || '测试'}背景音乐3`
    },
    {
      value: 'https://download.samplelib.com/wav/sample-6s.wav#4',
      label: `${filter.style || '测试'}背景音乐4`
    }
  ])
}
</script>

<template>
  <div class="content">
    <BarWrapper>
      <BarWrapperGroup divider="green">
        <BarButton text="24K高清音质" icon="play" disabled></BarButton>
      </BarWrapperGroup>
      <BarWrapperGroup divider="cyan">
        <SpeakerMenu @error="handleError" :fetch="fetchSpeaker"></SpeakerMenu>
        <ReadMenu @error="handleError"></ReadMenu>
        <DigitalMenu @error="handleError"></DigitalMenu>
        <ContinuousMenu @error="handleError"></ContinuousMenu>
        <AliasMenu @error="handleError"></AliasMenu>
        <EnglishMenu :fetch="fetchEnglish" @error="handleError"></EnglishMenu>
      </BarWrapperGroup>
      <BarWrapperGroup divider="orange">
        <ChangespeedMenu @error="handleError"></ChangespeedMenu>
        <BarButton text="多人配音" icon="management" disabled></BarButton>
        <BarButton text="局部变音" icon="conversion" disabled></BarButton>
      </BarWrapperGroup>
      <BarWrapperGroup divider="purple">
        <RhythmMenu @error="handleError"></RhythmMenu>
        <MuteMenu @error="handleError"></MuteMenu>
      </BarWrapperGroup>
      <BarWrapperGroup divider="yellow">
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
      </BarWrapperGroup>
    </BarWrapper>
  </div>
</template>

<style lang="scss" scoped></style>
