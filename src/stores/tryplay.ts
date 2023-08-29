import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { defaultSpeaker, type Speaker } from '@/model'
import { useSSMLStore } from './ssml'

export const useTryPlayStore = defineStore('--editor-try-play', () => {
  const ssmlStore = useSSMLStore()
  const _speaker = ref<Speaker>(defaultSpeaker())

  const speaker = computed(() => _speaker.value)

  const setSpeaker = (value: Speaker) => {
    _speaker.value = value
    ssmlStore.rootVoice.name = value.value
  }
  return { speaker, setSpeaker }
})
