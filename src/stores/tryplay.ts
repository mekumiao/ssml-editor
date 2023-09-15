import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { defaultSpeaker, type Speaker } from '@/model'
import { useSSMLStore } from './ssml'
import AudioPlayer from '@/menu/conversion-menu/audio-player'
import { serializeToSSML } from '@/serialize'
import { sleep } from '@/utils'
import { emitter } from '@/event-bus'
import type { AudioInfo } from '@/menu/conversion-menu/data'
import { getConfig } from '@/config'

export const useTryPlayStore = defineStore('--editor-try-play', () => {
  const config = getConfig()
  const ssmlStore = useSSMLStore()
  const _audioPlayer = shallowRef(new AudioPlayer())
  const _speaker = ref<Speaker>(defaultSpeaker())
  const _isLoading = ref(false)

  const speaker = computed(() => _speaker.value)
  const audioPlayer = computed(() => _audioPlayer.value)
  const isLoading = computed(() => _isLoading.value)

  const setSpeaker = (value: Speaker) => {
    function setter(value: Speaker) {
      _speaker.value = value
      ssmlStore.rootVoice.name = value.name
      emitter.emit('tryplay-speaker-select', value)
    }
    if (config.tryPlay.selectSpeaker) {
      config.tryPlay.selectSpeaker(value, setter)
    } else {
      setter(value)
    }
  }

  const setStar = (value: boolean) => {
    _speaker.value.isStar = value
  }

  async function play(fetchAudio: (ssmlGetter: () => string) => Promise<AudioInfo>) {
    if (isLoading.value) {
      _isLoading.value = false
      audioPlayer.value.cancel()
      return
    }
    if (audioPlayer.value.playState.value === 'playing') {
      audioPlayer.value.pause()
      return
    }
    try {
      _isLoading.value = true
      const audio = await fetchAudio(serializeToSSML)
      await audioPlayer.value.load(audio.src)
      await sleep(200)
      if (isLoading.value) {
        _isLoading.value = false
        audioPlayer.value.play()
      }
    } catch (error) {
      if (error instanceof Error) {
        emitter.emit('error', error.message)
      }
      console.error(error)
    } finally {
      _isLoading.value = false
    }
  }

  return { speaker, setSpeaker, setStar, audioPlayer, isLoading, play }
})
