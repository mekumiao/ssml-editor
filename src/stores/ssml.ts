import { type MsttsBackgroundaudio, type MsttsExpressAs, type Prosody, type Voice } from '@/core'
import { defineStore } from 'pinia'
import { shallowReactive } from 'vue'

export const useSSMLStore = defineStore('--editor-ssml', () => {
  const rootVoice = shallowReactive<Voice>({
    type: 'ssml-voice',
    name: '',
    remark: '',
    effect: '',
    children: [],
  })

  const rootBackgroundaudio = shallowReactive<MsttsBackgroundaudio>({
    type: 'ssml-mstts:backgroundaudio',
    src: '',
    remark: '',
    children: [],
  })

  const rootExpressAs = shallowReactive<MsttsExpressAs>({
    type: 'ssml-mstts:express-as',
    style: '',
    role: '',
    remark: '',
    children: [],
  })

  const rootProsody = shallowReactive<Prosody>({
    type: 'ssml-prosody',
    remark: '',
    children: [],
  })

  return { rootVoice, rootBackgroundaudio, rootExpressAs, rootProsody }
})
