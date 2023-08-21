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
import { onMounted, onUnmounted } from 'vue'
import { emitter } from '@/event-bus'

onMounted(() => {
  emitter.on('editor-error', handleError)
})

onUnmounted(() => {
  emitter.off('editor-error', handleError)
})

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
        <SpecialMenu></SpecialMenu>
        <BgmMenu></BgmMenu>
      </BarWrapperGroup>
    </BarWrapper>
  </div>
</template>

<style lang="scss" scoped></style>
