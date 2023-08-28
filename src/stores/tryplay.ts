import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { defaultSpeaker, type Speaker } from '@/model'

export const useTryPlayStore = defineStore('--editor-try-play', () => {
  const _speaker = ref<Speaker>(defaultSpeaker())

  const speaker = computed(() => _speaker.value)

  const setSpeaker = (value: Speaker) => {
    _speaker.value = value
  }
  return { speaker, setSpeaker }
})
