import { type MsttsBackgroundaudio, type MsttsExpressAs, type Speak, type Voice } from '@/core'
import { defineStore } from 'pinia'
import { shallowReactive } from 'vue'

export const useSSMLStore = defineStore('--editor-ssml', () => {
  const rootSpeak = shallowReactive<Speak>({
    type: 'ssml-speak',
    version: '1.0',
    xmlLang: 'zh-CN',
    xmlns: 'http://www.w3.org/2001/10/synthesis',
    'xmlns:mstts': 'http://www.w3.org/2001/mstts',
    'xmlns:emo': 'http://www.w3.org/2009/10/emotionml',
    remark: '',
    children: []
  })

  const rootVoice = shallowReactive<Voice>({
    name: 'zh-CN-XiaomoNeural',
    type: 'ssml-voice',
    remark: 'Xiaomo-晓墨',
    effect: '',
    children: []
  })

  const rootBackgroundaudio = shallowReactive<MsttsBackgroundaudio>({
    type: 'ssml-mstts:backgroundaudio',
    src: '',
    remark: '',
    children: []
  })

  const rootExpressAs = shallowReactive<MsttsExpressAs>({
    type: 'ssml-mstts:express-as',
    style: '',
    role: '',
    remark: '',
    children: []
  })

  return { rootSpeak, rootVoice, rootBackgroundaudio, rootExpressAs }
})
