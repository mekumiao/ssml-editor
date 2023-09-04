import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { defaultSpeaker, type Speaker } from '@/model'
import { useSSMLStore } from './ssml'
import AudioPlayer from '@/menu/conversion-menu/audio-player'

export const useTryPlayStore = defineStore('--editor-try-play', () => {
  const ssmlStore = useSSMLStore()
  const _audioPlayer = shallowRef(new AudioPlayer())
  const _speaker = ref<Speaker>(defaultSpeaker())

  const speaker = computed(() => _speaker.value)
  const audioPlayer = computed(() => _audioPlayer.value)

  const setSpeaker = (value: Speaker) => {
    _speaker.value = value
    ssmlStore.rootVoice.name = value.name
  }
  return { speaker, setSpeaker, audioPlayer }
})
