import { type MsttsBackgroundaudio, type Speak, type Voice } from '@/core'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const useSSMLStore = defineStore('--editor-ssml', () => {
  const speak = reactive<Speak>({
    type: 'ssml-speak',
    version: '1.0',
    xmlLang: 'zh-CN',
    xmlns: 'http://www.w3.org/2001/10/synthesis'
  })

  const rootSpeak = computed(() => speak)

  const rootVoice = reactive<Voice>({
    name: '',
    type: 'ssml-voice',
    remark: '',
    effect: '',
    children: []
  })

  const backgroundaudio = reactive<MsttsBackgroundaudio & { remark: string }>({
    type: 'ssml-mstts:backgroundaudio',
    src: '',
    remark: ''
  })

  return { rootSpeak, rootVoice, backgroundaudio }
})
