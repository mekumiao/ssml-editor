import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { defaultSpeaker, type Speaker } from '@/model'
import { useSSMLStore } from './ssml'
import AudioPlayer from '@/menu/conversion-menu/audio-player'
import { serializeToSSML } from '@/serialize'
import { sleep } from '@/utils'
import { emitter } from '@/event-bus'
import { EMITTER_EVENT } from '@/constant'
import type { AudioInfo } from '@/menu/conversion-menu/data'

export const useTryPlayStore = defineStore('--editor-try-play', () => {
  const ssmlStore = useSSMLStore()
  const _audioPlayer = shallowRef(new AudioPlayer())
  const _speaker = ref<Speaker>(defaultSpeaker())
  const _isLoading = ref(false)

  const speaker = computed(() => _speaker.value)
  const audioPlayer = computed(() => _audioPlayer.value)
  const isLoading = computed(() => _isLoading.value)

  const setSpeaker = (value: Speaker) => {
    _speaker.value = value
    ssmlStore.rootVoice.name = value.name
  }

  async function play(fetchAudio: (ssml: string) => Promise<AudioInfo>) {
    if (isLoading.value) return
    if (audioPlayer.value.playState.value === 'playing') {
      audioPlayer.value.pause()
      return
    }
    try {
      const ssml = serializeToSSML()
      _isLoading.value = true
      const audio = await fetchAudio(ssml)
      await audioPlayer.value.load(audio.src)
      await sleep(200)
      audioPlayer.value.play()
    } catch (error) {
      if (error instanceof Error) {
        emitter.emit(EMITTER_EVENT.ERROR, error.message)
      }
    } finally {
      _isLoading.value = false
    }
  }

  return { speaker, setSpeaker, audioPlayer, isLoading, play }
})
